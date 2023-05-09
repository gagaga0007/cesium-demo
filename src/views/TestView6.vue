<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'

const viewer = ref()
const interval = ref()

onMounted(async () => {
  const v = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
  })

  viewer.value = v

  // 加载 geoJson 数据
  // http://datav.aliyun.com/portal/school/atlas/area_selector
  const dataGeo = await Cesium.GeoJsonDataSource.load(
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
    {
      stroke: Cesium.Color.RED.withAlpha(0.5),
      fill: Cesium.Color.AQUA.withAlpha(0.5),
      strokeWidth: 2,
    }
  )
  // 添加
  const dataSources = await v.dataSources.add(dataGeo)

  // 获取实体并自定义实体属性
  const entities = dataSources.entities.values
  entities.forEach((entity) => {
    // 材质
    entity.polygon.material = new Cesium.ColorMaterialProperty(
      Cesium.Color.fromRandom({ alpha: 0.5 })
    )
    // 外边框
    // entity.polygon.outline = null
    // 挤出高度
    // entity.polygon.extrudedHeight = 1000000
  })
})

onUnmounted(() => {
  if (viewer.value) viewer.value.destroy()
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
})
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
