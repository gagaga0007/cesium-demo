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
    shouldAnimate: true, // 是否允许动画
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

  // 加载 kml 数据（xml 格式）
  const kmlData = await Cesium.KmlDataSource.load('./geo/facilities.kml', {
    camera: v.scene.camera,
    canvas: v.scene.canvas,
    screenOverlayContainer: v.container,
  })
  await v.dataSources.add(kmlData)

  // 加载 kmz 数据（压缩格式）
  // const kmzData = await Cesium.KmlDataSource.load('./geo/kmlfactbook_output.kmz', {
  //   camera: v.scene.camera,
  //   canvas: v.scene.canvas,
  //   screenOverlayContainer: v.container,
  // })
  // await v.dataSources.add(kmzData)

  // 加载czml数据（JSON 格式）
  const czmlData = await Cesium.CzmlDataSource.load('./geo/box.czml')
  await v.dataSources.add(czmlData)
  // await v.flyTo(czmlData)

  // czml 时序移动
  const czml = [
    {
      id: 'document',
      name: 'CZML Point - Time Dynamic',
      version: '1.0',
    },
    {
      id: 'point',
      // 物体在什么时间范围可用
      availability: '2012-08-04T16:00:00Z/2012-08-04T16:05:00Z',
      position: {
        // 设置物体的起始时间
        epoch: '2012-08-04T16:00:00Z',
        // 设置了四个维度：时间、经度、纬度、高度
        cartographicDegrees: [
          0, 70, 20, 150000, 100, 80, 44, 150000, 200, 90, 18, 150000, 300, 98, 52, 150000,
        ],
      },
      point: {
        color: {
          rgba: [255, 255, 255, 128],
        },
        outlineColor: {
          rgb: [255, 0, 0],
        },
        outlineWidth: 4,
        pixelSize: 16,
      },
    },
  ]

  const czmlData2 = Cesium.CzmlDataSource.load(czml)
  await v.dataSources.add(czmlData2)
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
