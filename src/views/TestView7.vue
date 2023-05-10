<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'
import PlaneJson from '@/assets/plane.json'

const viewer = ref()

onMounted(async () => {
  const v = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    shouldAnimate: true, // 是否允许动画
  })

  viewer.value = v

  // 添加 3D 建筑
  v.scene.primitives.add(new Cesium.createOsmBuildings())

  const positionProperty = new Cesium.SampledPositionProperty()

  // 事件间隔，秒
  const timeStep = 30
  // 总共时间，秒
  const timeTotal = (PlaneJson.length - 1) * timeStep
  // 起点时间
  const timeStart = new Date('2022-03-09T23:10:00Z')

  // 转换为 Cesium 支持的 儒略日 事件
  const startJulian = Cesium.JulianDate.fromDate(timeStart)
  // 终点时间
  const stopJulian = Cesium.JulianDate.addSeconds(startJulian, timeTotal, new Cesium.JulianDate())

  // 设置查看器时间
  v.clock.startTime = startJulian.clone()
  v.clock.stopTime = stopJulian.clone()
  v.clock.currentTime = startJulian.clone()
  v.timeline.zoomTo(startJulian, stopJulian)

  PlaneJson.forEach((item, index) => {
    // 每个点的时间
    const time = Cesium.JulianDate.addSeconds(
      startJulian,
      index * timeStep,
      new Cesium.JulianDate()
    )
    // 每个点的位置
    const position = Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, item.height)
    // 存入 property
    positionProperty.addSample(time, position)
    // 添加点
    v.entities.add({
      position: position,
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
    })
  })

  // 导入飞机模型
  const planeEntities = v.entities.add({
    name: 'plane',
    position: positionProperty,
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({ start: startJulian, stop: stopJulian }),
    ]),
    // 自动根据采样点，计算速度和方向
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    model: {
      uri: './model/Air.glb',
    },
    path: new Cesium.PathGraphics({
      width: 4,
    }),
  })

  // 相机跟踪
  v.trackedEntity = planeEntities
  // 时间倍速
  v.clock.multiplier = 100
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
