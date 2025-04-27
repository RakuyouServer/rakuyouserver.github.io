<script setup lang="ts">
import 'media-chrome'
</script>

<template>
  123
  <media-controller>
    <video
        slot="media"
        src="D:\AF_NCOP.mp4"
    ></video>
    <media-control-bar>
      <media-play-button/>
      <media-mute-button/>
      <media-volume-range/>
      <media-time-range/>
      <media-pip-button/>
      <media-fullscreen-button/>
    </media-control-bar>
  </media-controller>
</template>

<style scoped>
media-play-button {
  --media-icon-color: lightpink;
  --media-control-hover-background: rgba(0, 160, 179, 0.85);
}
</style>
