<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'

const viewer = ref()

onMounted(async () => {
  const v = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
  })

  viewer.value = v

  const tileset = new Cesium.Cesium3DTileset({
    url: './geo/tileset.json',
  })

  tileset.readyPromise.then((tileset) => {
    v.zoomTo(tileset)
  })

  v.scene.primitives.add(tileset)
  // 3D Tile 调试面板
  v.extend(Cesium.viewerCesium3DTilesInspectorMixin)
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
