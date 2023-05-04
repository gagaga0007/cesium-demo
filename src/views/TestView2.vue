<script setup>
import * as Cesium from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'

const viewer = ref()

onMounted(async () => {
  const v = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
  })

  v.cesiumWidget.creditContainer.style.display = 'none'

  viewer.value = v
})

onUnmounted(() => {
  if (viewer.value) viewer.value.destroy()
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
