<template>
  <a-flex class="register" vertical justify="center" align="center" :gap="18">
    <div class="register__title-group">
      <div class="register__title">注册</div>
      <div class="register__subtitle">欢迎来到Raku Anime</div>
    </div>

    <a-form
        class="register__form"
        ref="formRef"
        scroll-to-first-error
        :model="formData"
        :rules="rules"
        @validate="onValidate"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
      <a-form-item class="register__form-item" name="username">
        <div class="register__label">用户名：</div>
        <a-input
            v-model:value="formData.username"
            size="large"
            placeholder="请输入用户名"
            allow-clear
        >
          <template #prefix>
            <AccountCircleOutlined class="register__icon"/>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item class="register__form-item" name="password">
        <div class="register__label">密码：</div>
        <a-input-password
            v-model:value="formData.password"
            size="large"
            type="password"
            placeholder="请输入密码"
            allow-clear
        >
          <template #prefix>
            <LockOutlined class="register__icon"/>
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item class="register__form-item" name="passwordRepeat">
        <div class="register__label">确认密码：</div>
        <a-input-password
            v-model:value="formData.passwordRepeat"
            size="large"
            type="password"
            placeholder="请再次输入密码"
            allow-clear
        >
          <template #prefix>
            <LockOutlined class="register__icon"/>
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item class="register__form-item" name="email">
        <div class="register__label">邮箱：</div>
        <a-input
            v-model:value="formData.email"
            size="large"
            placeholder="请输入邮箱"
            allow-clear
        >
          <template #prefix>
            <EmailOutlined class="register__icon"/>
          </template>
        </a-input>
      </a-form-item>

      <div class="register__spacer"/>

      <a-form-item class="register__form-item">
        <a-button
            class="register__submit"
            size="large"
            type="primary"
            html-type="submit"
            :disabled="!isFormValidated"
            :loading="loading"
        >
          注册
        </a-button>
      </a-form-item>

      <a-flex class="register__login-link" justify="flex-end" align="center" gap="6">
        <div>已有账号？</div>
        <a-button type="link" size="small" @click="goLogin" class="register__login-button-link">
          <a-flex justify="center" :gap="2" class="register__login-button-content">
            立即登录
            <KeyboardDoubleArrowRightRound class="register__login-icon"/>
          </a-flex>
        </a-button>
      </a-flex>
    </a-form>
  </a-flex>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {AccountCircleOutlined, EmailOutlined, KeyboardDoubleArrowRightRound, LockOutlined} from '@vicons/material';
import {type FormInstance, message} from "ant-design-vue";
import {createFieldStatus, createRules} from "@/utils/registerRules.ts";
import {register} from "@/services/auth.ts";
import type {RegisterRequest} from "@/types/auth.ts";

const router = useRouter();

const formRef = ref<FormInstance>();

interface RegisterForm {
  username: string;
  password: string;
  passwordRepeat: string;
  email: string;
}

const formData = reactive<RegisterForm>({
  username: '',
  password: '',
  passwordRepeat: '',
  email: '',
});

const rules = createRules(formData);
const fieldStatus = ref(createFieldStatus());

const onValidate = (fieldName: string, status: boolean) => {
  fieldStatus.value[fieldName as keyof RegisterForm] = status;
};

const isFormValidated = computed(() =>
    Object.entries(fieldStatus.value)
        .filter(([key]) => rules[key as keyof RegisterForm].length > 0)
        .every(([, status]) => status)
);

const loading = ref(false);

const onFinish = async (validatedForm: RegisterForm) => {
  try {
    loading.value = true;
    const {passwordRepeat, ...submitData} = validatedForm;
    const data = await register({
      username: submitData.username,
      password: submitData.password,
      email: submitData.email,
    } as RegisterRequest);

    message.success(data);
    await router.push({name: 'login-page'});
  } catch (error: any) {
    formRef.value?.resetFields(['password', 'passwordRepeat']);
    message.error(`注册失败：${error.response.data}`);
  } finally {
    loading.value = false;
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log(errorInfo);
};

const goLogin = () => {
  router.push({name: 'login-page'});
};
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
}

.register__title-group {
  width: 100%;
  text-align: left;
}

.register__title {
  font-size: 26px;
  font-weight: bold;
}

.register__subtitle {
  color: gray;
}

.register__form {
  width: 100%;
}

.register__form-item {
  margin-bottom: 18px;
}

.register__label {
  margin-bottom: 8px;
}

.register__icon {
  color: darkgray;
  width: 1.2em;
  height: 1.2em;
}

.register__spacer {
  height: 18px;
}

.register__submit {
  width: 100%;
}

.register__login-link {
  width: 100%;
}

.register__login-button-link {
  padding: 0;
}

.register__login-button-content {
  height: 100%;
}

.register__login-icon {
  font-size: 10px;
}
</style>

