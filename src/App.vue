<template>
  <a-app>
    <a-config-provider :theme="themeStore.theme?.common">
      <a-layout class="app">
        <top-bar class="app__top-bar"/>
        <a-layout class="app__content">
          <router-view/>
        </a-layout>
      </a-layout>
    </a-config-provider>
  </a-app>
</template>

<script setup lang="ts">
import {TopBar} from "@/components";
import {useThemeStore, useUserStore} from "@/stores";
import {message} from 'ant-design-vue';

message.config({
  top: '4.5em',
});

const themeStore = useThemeStore();
themeStore.init();

useUserStore().init();
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;

  /*background-image: linear-gradient(to right bottom, #0f8d76, #838f14);*/
  background-image: url("@/assets/bg.jpg");
  background-size: cover;
  background-position: center;
}

.app__top-bar {
  position: fixed;
  z-index: 1;
}

.app__content {
  overflow: auto;
  padding-top: 58px;
  background: transparent;
}
</style>
