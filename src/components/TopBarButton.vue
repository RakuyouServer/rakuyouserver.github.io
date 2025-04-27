<template>
  <div class="topbar-button" @click="handleClick">
    <div ref="iconRef" class="topbar-button__icon">
      <slot name="icon"/>
    </div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>();

const iconRef = ref<HTMLDivElement | null>(null);

const handleClick = (event: MouseEvent) => {
  emit('click', event);

  const icon = iconRef.value;
  if (icon) {
    icon.classList.remove('topbar-button--clicked');
    icon.getBoundingClientRect();
    icon.classList.add('topbar-button--clicked');
  }
}
</script>

<style scoped>
.topbar-button {
  min-width: max-content;
  min-height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}

.topbar-button__icon {
  margin-bottom: -4px;
}

.topbar-button--clicked {
  animation: bounce-up 0.3s ease;
}

@keyframes bounce-up {
  0% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
