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

  // 根据条件设置样式
  tiles3D.style = new Cesium.Cesium3DTileStyle({
    defines: {
      distance:
        "distance(vec2(${feature['cesium#longitude']}, ${feature['cesium#latitude']}), vec2(113.3191, 23.109))",
    },
    color: {
      conditions: [
        ['${distance} < 0.01', "color('rgba(0, 0, 50, 0.7)')"],
        ['${distance} < 0.02', "color('rgba(0, 0, 50, 0.4)')"],
        ['${distance} < 0.04', "color('rgba(0, 0, 50, 0.2)')"],
        ['true', "color('white')"],
      ],
    },
    // 显示条件
    show: "${distance} < 0.04 && ${feature['building']} === 'apartments'",
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
