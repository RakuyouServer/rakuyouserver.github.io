<template>
  <a-flex class="login" vertical justify="center" align="center" :gap="18">
    <div class="login__title-group">
      <div class="login__title">登录</div>
      <div class="login__subtitle">欢迎回到Raku Anime</div>
    </div>

    <a-form
        class="login__form"
        ref="formRef"
        scroll-to-first-error
        :model="formData"
        :rules="rules"
        @validate="onValidate"
        @finish="onFinish"
    >
      <a-form-item class="login__form-item" name="username">
        <div class="login__label">用户名：</div>
        <a-input
            v-model:value="formData.username"
            size="large"
            placeholder="请输入用户名"
            allow-clear
        >
          <template #prefix>
            <AccountCircleOutlined class="login__icon"/>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item class="login__form-item" name="password">
        <div class="login__label">密码：</div>
        <a-input-password
            v-model:value="formData.password"
            size="large"
            type="password"
            placeholder="请输入密码"
            allow-clear
        >
          <template #prefix>
            <LockOutlined class="login__icon"/>
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item class="login__form-item" name="remember">
        <a-flex class="login__options" justify="space-between" align="center">
          <a-checkbox
              class="login__remember"
              v-model:checked="formData.remember"
          >
            记住我
          </a-checkbox>
          <a-button class="login__forgot" type="link">忘记密码？</a-button>
        </a-flex>
      </a-form-item>

      <a-form-item class="login__form-item">
        <a-button
            class="login__submit"
            size="large"
            type="primary"
            html-type="submit"
            :disabled="!isFormValidated"
            :loading="loading"
        >
          登录
        </a-button>
      </a-form-item>

      <a-flex class="login__register" justify="flex-end" align="center" gap="6">
        <div>还没有账号？</div>
        <a-button type="link" size="small" @click="goRegister" class="login__register-link">
          <a-flex justify="center" :gap="2" class="login__register-flex">
            立即注册
            <KeyboardDoubleArrowRightRound class="login__register-icon"/>
          </a-flex>
        </a-button>
      </a-flex>
    </a-form>
  </a-flex>
</template>

<script setup lang="ts">
import {AccountCircleOutlined, KeyboardDoubleArrowRightRound, LockOutlined} from '@vicons/material'
import {useRouter} from "vue-router";
import {computed, reactive, ref} from "vue";
import type {FormInstance} from "ant-design-vue/lib";
import {createLoginFieldStatus, createLoginRules} from "@/utils/loginRules.ts";
import type {LoginForm, LoginRequest} from "@/types/auth.ts";
import {message} from "ant-design-vue";
import {login} from "@/services/auth.ts";

const router = useRouter();

const formRef = ref<FormInstance>();

const formData = reactive<LoginForm>({
  username: '',
  password: '',
  remember: false,
});

const rules = createLoginRules();
const fieldStatus = ref(createLoginFieldStatus());

const onValidate = (fieldName: string, status: boolean) => {
  fieldStatus.value[fieldName as keyof LoginForm] = status;
};

const isFormValidated = computed(() =>
    Object.entries(fieldStatus.value)
        .filter(([key]) => rules[key as keyof LoginForm].length > 0)
        .every(([, status]) => status)
);

const loading = ref(false);

const onFinish = async (validatedForm: LoginForm) => {
  loading.value = true;

  try {
    await login({
      username: validatedForm.username,
      password: validatedForm.password,
      remember: validatedForm.remember,
    } as LoginRequest);

    message.success('登录成功');
    router.replace({name: 'home-view'}).then();
  } catch (error: any) {
    formRef.value?.resetFields('password');
    message.error(`登录失败：${error.response.data}`);
  } finally {
    loading.value = false;
  }
};

const goRegister = () => {
  router.push({name: 'register-page'});
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
}

.login__title-group {
  width: 100%;
  text-align: left;
}

.login__title {
  font-size: 26px;
  font-weight: bold;
}

.login__subtitle {
  color: gray;
}

.login__form {
  width: 100%;
}

.login__form-item {
  margin-bottom: 18px;
}

.login__label {
  margin-bottom: 8px;
}

.login__icon {
  color: darkgray;
  width: 1.2em;
  height: 1.2em;
}

.login__options {
  width: 100%;
}

.login__remember {
  user-select: none;
}

.login__forgot {
  padding: 0;
}

.login__submit {
  width: 100%;
}

.login__register {
  width: 100%;
}

.login__register-link {
  padding: 0;
}

.login__register-flex {
  height: 100%;
}

.login__register-icon {
  font-size: 10px;
}
</style>
