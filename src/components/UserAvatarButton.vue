<template>
  <div>
    <transition name="avatar-card-fade">
      <div
          class="avatar-card__wrapper"
          v-show="showCard"
          @mouseenter="onHoverAvatar"
          @mouseleave="onLeaveAvatar"
      >
        <a-card
            class="avatar-card"
            size="small"
            :style="cardStyle"
        >
          <a-flex justify="center" style="font-size: 18px; margin-bottom: 8px">
            {{ userStore.info?.nickname }}
          </a-flex>

          <a-space direction="vertical" style="width: 100%">

            <!--个人中心按钮-->
            <a-button
                class="avatar-card__function-button"
                type="text"
                block
                @click="router.push({name: 'personal-center-view'})"
            >
              <a-flex>
                <UserOutlined/>
                <div style="margin-left: 8px; width: 100%">个人中心</div>
                <RightOutlined/>
              </a-flex>
            </a-button>

            <a-divider style="margin: 0;"/>

            <!--退出登录按钮-->
            <a-button
                class="avatar-card__function-button"
                type="text"
                block
                @click="handleLogout"
            >
              <a-flex>
                <LogoutOutlined/>
                <div style="margin-left: 8px; width: 100%">{{ '退出登录' }}</div>
                <RightOutlined/>
              </a-flex>
            </a-button>
          </a-space>
        </a-card>
      </div>
    </transition>

    <a-avatar
        ref="avatarAnime"
        class="avatar-anime"
        size="large"
        :src="userStore.info.avatarUrl"
        @mouseenter="onHoverAvatar"
        @mouseleave="onLeaveAvatar"
    >
      <template #icon>
        <UserOutlined/>
      </template>
    </a-avatar>
    <a-avatar
        ref="avatarFixed"
        class="avatar-fixed"
        size="large"
        :src="userStore.info.avatarUrl"
        @mouseenter="onHoverAvatar"
        @mouseleave="onLeaveAvatar"
    >
      <template #icon>
        <UserOutlined/>
      </template>
    </a-avatar>
  </div>
</template>

<script setup lang="ts">
import {computed, type CSSProperties, ref, shallowRef, watch} from "vue";
import {message} from 'ant-design-vue';
import {LogoutOutlined, RightOutlined, UserOutlined} from "@ant-design/icons-vue";
import {logout} from "@/services/auth.ts";
import {useRouter} from "vue-router";
import {useThemeStore, useUserStore} from "@/stores";
import {hexToRgba} from "@/utils/colorUtils.ts";

const router = useRouter();

const themeStore = useThemeStore();
const cardStyle = computed<CSSProperties>(() => ({
  background: hexToRgba(themeStore.theme?.common.token?.colorBgContainer ?? '#ffffff', 0.85),
}));

const userStore = useUserStore();

const avatarAnime = shallowRef();
const avatarFixed = shallowRef();

const isHovering = ref(false);
let hideTimeout: ReturnType<typeof setTimeout> | null = null;
const showCard = ref(false);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let currentState: 'hover' | 'leave' | null = null;

watch(isHovering, (newVal) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    if (newVal && currentState !== 'hover') {
      handleHover();
      currentState = 'hover';
    } else if (!newVal && currentState !== 'leave') {
      handleLeaveHover();
      currentState = 'leave';
    }
  }, 100);
});

const handleHover = () => {
  const animeElement = avatarAnime.value.$el as HTMLElement;
  const fixedElement = avatarFixed.value.$el as HTMLElement;
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  animeElement.classList.add('avatar-anime-popup');
  animeElement.style.opacity = '1';
  fixedElement.style.opacity = '0';
  showCard.value = true;
};

const handleLeaveHover = () => {
  const animeElement = avatarAnime.value.$el as HTMLElement;
  const fixedElement = avatarFixed.value.$el as HTMLElement;
  showCard.value = false;
  animeElement.classList.remove('avatar-anime-popup');
  fixedElement.style.opacity = '0';
  hideTimeout = setTimeout(() => {
    animeElement.style.opacity = '0';
    fixedElement.style.opacity = '1';
  }, 250);
};

const onHoverAvatar = () => {
  isHovering.value = true;
};

const onLeaveAvatar = () => {
  isHovering.value = false;
};

const handleLogout = async () => {
  await logout().finally(() => {
    message.success('登出成功');
    router.push({name: 'login-page'});
  });
}
</script>

<style scoped>
.avatar-card__wrapper {
  position: absolute;
  transform: translate(-140px, 60px);
}

.avatar-card {
  width: 300px;
  padding: 28px 10px 8px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.avatar-card__function-button {
  height: 40px;
  text-align: start;
}

.avatar-anime, .avatar-fixed {
  background: #9f9f9f;
  border: 0.04em solid #727272;
  cursor: pointer;
}

.avatar-anime {
  position: absolute;
  opacity: 0;
  scale: 1;
  z-index: 1;
  transition: transform 0.25s ease-out;
}

.avatar-anime-popup {
  transform: scale(2) translate(-5px, 15px);
}

.avatar-card-fade-enter-active,
.avatar-card-fade-leave-active {
  transition: opacity 0.25s ease-out, transform 0.25s ease-out;
}

.avatar-card-fade-enter-from,
.avatar-card-fade-leave-to {
  opacity: 0;
  transform: translate(-140px, 55px);
}

.avatar-card-fade-enter-to,
.avatar-card-fade-leave-from {
  opacity: 1;
  transform: translate(-140px, 60px);
}
</style>