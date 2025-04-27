<template>
  <div class="topbar-wrapper">
    <a-flex class="topbar" justify="space-between" :style="topBarStyle">

      <a-flex
          class="topbar__left-section"
          :flex="1"
          justify="flex-start"
          align="center"
          :gap="16"
      >
        <div class="topbar__logo-container" @click="router.push({name: 'home-view'})">
          <img class="topbar__logo" src="@/assets/logo-s.png" alt="Logo" draggable="false"/>
        </div>
      </a-flex>

      <a-flex
          class="topbar__center-section"
          :flex="1"
          justify="center"
          align="center"
      >
        <search-input @search="handleSearch" style="width: 100%"/>
      </a-flex>

      <a-flex
          class="topbar__right-section"
          :flex="1"
          justify="flex-end"
          align="center"
          :gap="24"
      >
        <user-avatar-button v-if="userStore.authorized"/>
        <a-button class="topbar__login-button" v-else type="primary" @click="router.push({name: 'login-page'})">登录</a-button>

        <a-space class="topbar__function-button-container" :size="24">
          <top-bar-button>
            <template #icon>
              <StarOutlineRound class="topbar__function-button-icon"/>
            </template>
            收藏
          </top-bar-button>

          <top-bar-button>
            <template #icon>
              <HistoryRound class="topbar__function-button-icon"/>
            </template>
            历史
          </top-bar-button>

          <top-bar-button @click="toggleTheme">
            <template #icon>
              <LightModeOutlined class="topbar__function-button-icon" v-if="themeName === 'light'"/>
              <DarkModeOutlined class="topbar__function-button-icon" v-else-if="themeName === 'dark'"/>
            </template>
            主题
          </top-bar-button>
        </a-space>
      </a-flex>

    </a-flex>
  </div>
</template>

<script setup lang="ts">
import {useThemeStore, useUserStore} from "@/stores";
import {computed, type CSSProperties} from "vue";
import {SearchInput, TopBarButton, UserAvatarButton} from "@/components";
import {DarkModeOutlined, HistoryRound, LightModeOutlined, StarOutlineRound} from '@vicons/material';
import {useRouter} from "vue-router";

const router = useRouter();

const themeStore = useThemeStore();
const themeName = computed(() => themeStore.themeName);

const topBarStyle = computed<CSSProperties>(() => ({
  background: themeStore.theme?.topBar.colorBg,
}));

const toggleTheme = () => {
  if (themeName.value === "dark") {
    themeStore.useLightTheme();
  } else if (themeName.value === "light") {
    themeStore.useDarkTheme();
  }
};

const handleSearch = (content: string) => {
  console.log(content);
};

const userStore = useUserStore();
</script>

<style scoped>
.topbar-wrapper {
  width: 100%;
  background: transparent;
}

.topbar {
  width: 100%;
  min-height: 58px;
  max-height: 58px;
  backdrop-filter: blur(12px);
}

.topbar__logo-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 70%;
}

.topbar__logo {
  height: 18px;
  user-select: none;
}

.topbar__left-section {
  min-width: calc(100% / 3);
  max-width: calc(100% / 3);
  padding: 0 8px 0 16px;
}

.topbar__center-section {
  padding: 0 8px;
}

.topbar__right-section {
  min-width: calc(100% / 3);
  max-width: calc(100% / 3);
  padding: 0 16px 0 8px;
}

.topbar__login-button {
  width: 75px;
}

.topbar__function-button-icon {
  height: 1.7em;
}

@media (max-width: 770px) {
  .topbar__right-section {
    max-width: min-content;
    min-width: min-content;
  }

  .topbar__left-section {
    max-width: min-content;
    min-width: min-content;
  }
}

@media (max-width: 610px) {
  .topbar__function-button-container {
    max-width: 80px;
    overflow-x: scroll;
  }
}

@media (max-width: 520px) {
  .topbar__function-button-container {
    max-width: 32px;
    overflow-x: scroll;
  }
}

@media (max-width: 430px) {
  .topbar__left-section {
    display: none;
  }
}
</style>