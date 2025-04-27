<template>
  <a-config-provider :theme="theme">
    <a-input
        class="search__input"
        v-model:value="searchContent"
        placeholder="请输入番剧名称..."
        @pressEnter="emitSearch"
        size="middle"
        allowClear
    >
      <template #suffix>
        <a-flex
            class="search__button-wrapper"
            justify="center"
            align="center"
        >
          <SearchOutlined
              class="search__button"
              :class="{ 'search__button--clicked': isButtonClicked }"
              @click="emitSearch"
              @mousedown="onClickDownSearchButton"
              @mouseup="onClickUpSearchButton"
          />
        </a-flex>
      </template>
    </a-input>
  </a-config-provider>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {SearchOutlined} from "@ant-design/icons-vue";
import {useThemeStore} from "@/stores";

const props = defineProps<{
  defaultValue?: string;
}>();

const emit = defineEmits<{
  (e: "search", value: string): void;
}>();

const themeStore = useThemeStore();

const theme = computed(() => ({
  token: themeStore.theme?.input
}));

const searchContent = ref<string>(props.defaultValue ?? "");
const isButtonClicked = ref(false);

// 初始值监听（仅执行一次）
const initContentWatch = watch(() => props.defaultValue, (newValue) => {
  if (!searchContent.value) searchContent.value = newValue ?? "";
  initContentWatch.stop();
});

const emitSearch = () => {
  const content = searchContent.value.trim();
  emit("search", content);
};

const onClickDownSearchButton = () => {
  isButtonClicked.value = true;
};

const onClickUpSearchButton = () => {
  isButtonClicked.value = false;
};
</script>

<style scoped>
.search__input {
  max-width: 512px;
}

.search__button-wrapper {
  margin-right: -6px;
  width: 32px;
  height: 32px;
}

.search__button {
  font-size: 18px;
  transition: transform 0.2s ease;
}

.search__button:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.search__button--clicked {
  transform: scale(1) !important;
}
</style>
