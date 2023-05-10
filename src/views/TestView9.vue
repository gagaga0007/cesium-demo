<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'

const viewer = ref()

onMounted(async () => {
  const v = new Cesium.Viewer('cesiumContainer')

  viewer.value = v

  const tiles3D = await Cesium.createOsmBuildingsAsync()
  v.scene.primitives.add(tiles3D)

  const position = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 2000)
  v.camera.flyTo({ destination: position, duration: 1 })

  // 设置样式
  tiles3D.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${feature['building']} === 'apartments'", "color('rgba(50, 255, 0, 0.5)')"],
        ["${feature['building']} === 'office'", "color('rgba(255, 255, 0, 0.5)')"],
        ["${feature['cesium#estimatedHeight']} > 300", "color('rgba(200, 200, 255, 0.7)')"],
        ["${feature['cesium#estimatedHeight']} > 100", "color('rgba(100, 100, 255, 0.7)')"],
        ["${feature['cesium#estimatedHeight']} > 50", "color('rgba(50, 50, 150, 0.7)')"],
        ['true', "color('white')"],
      ],
    },
    show: true,
  })
})

onUnmounted(() => {
  if (viewer.value) viewer.value.destroy()
})
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
