<template>
  <a-flex class="auth-container" vertical align="center">
    <div style="flex: 1"></div>

    <a-card
        v-if="showCard"
        class="auth-card"
        :style="authCardStyle"
        :body-style="{
          padding: '0',
        }"
    >
      <div class="auth-card__container">
        <a-flex class="auth-card__logo-section" vertical align="center" justify="center" :gap="22">
          <img class="auth-card__logo" src="@/assets/logo.png" draggable="false">
          <h2>一个极其不专业的动漫网站</h2>
        </a-flex>

        <a-flex class="auth-card__function-section" :style="functionSectionStyle">
          <a-config-provider :theme="theme">
            <router-view v-slot="{ Component }">
              <transition name="slide-fade" mode="out-in">
                <component :is="Component"/>
              </transition>
            </router-view>
          </a-config-provider>
        </a-flex>
      </div>
    </a-card>

    <div style="flex: 2"></div>
  </a-flex>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {hexToRgba} from "@/utils/colorUtils.ts";
import {useThemeStore} from "@/stores";

const themeStore = useThemeStore();

const theme = computed(() => ({
  token: themeStore.theme?.input
}));

const showCard = ref(false);

const authCardStyle = computed(() => ({
  backdropFilter: 'blur(18px)',
  background: hexToRgba(themeStore.themeToken?.colorBgContainer ?? '#ffffff', 0.6),
  userSelect: 'none',
}));

const functionSectionStyle = computed(() => ({
  background: themeStore.themeToken?.colorBgContainer
}));

setTimeout(() => {
  showCard.value = true;
}, 20);
</script>

<style scoped>
.slide-fade-enter-active {
  animation: routerViewBounceIn 0.4s ease-out;
}

.slide-fade-leave-active {
  animation: routerViewSlideOut 0.3s ease-in;
}

.auth-container {
  width: 100%;
  height: 100%;
}

.auth-card {
  flex: 1;
  max-width: fit-content;
  max-height: fit-content;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  animation: bounceIn 0.48s ease-out;
}

.auth-card__container {
  display: flex;
  flex-direction: row;
}

.auth-card__logo-section {
  width: 650px;
  border-radius: 16px;
}

.auth-card__logo {
  width: 500px;
}

.auth-card__function-section {
  padding: 40px;
  width: 380px;
  max-height: fit-content;
  border-radius: 16px;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  50% {
    transform: translateY(10px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes routerViewBounceIn {
  0% {
    transform: translateX(20px);
    opacity: 0;
  }
  50% {
    transform: translateX(-3px);
    opacity: 1;
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes routerViewSlideOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-20px);
    opacity: 0;
  }
}

@media (max-width: 1060px) {

  .auth-card__logo-section {
    gap: 8px !important;
    padding-top: 25px;
    width: 100%;
    height: 150px;
    min-width: 220px;
  }

  .auth-card {
    max-width: 380px;
    width: 90%;
  }

  .auth-card__container {
    flex-direction: column;
  }

  .auth-card__logo {
    width: 60%;
  }

  .auth-card__function-section {
    max-width: 380px;
    min-width: 220px;
    width: 100%;
  }
}
</style>
