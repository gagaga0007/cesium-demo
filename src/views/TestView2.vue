<script setup>
import * as Cesium from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'

const viewer = ref()

const onKeyDown = (e) => {
  // 相机距离地面高度
  const height = viewer.value.camera.positionCartographic.height
  // 自定义运动速率
  const moveRate = height / 100
  // 自定义朝向角度
  const moveRadians = Cesium.Math.toRadians(1)

  switch (e.key) {
    // 相机移动
    case 'w':
      viewer.value.camera.moveForward(moveRate)
      break
    case 's':
      viewer.value.camera.moveBackward(moveRate)
      break
    case 'a':
      viewer.value.camera.moveLeft(moveRate)
      break
    case 'd':
      viewer.value.camera.moveRight(moveRate)
      break
    // 相机朝向
    case 'q':
      viewer.value.camera.lookLeft(moveRadians)
      break
    case 'e':
      viewer.value.camera.lookRight(moveRadians)
      break
    case 'r':
      viewer.value.camera.lookUp(moveRadians)
      break
    case 'f':
      viewer.value.camera.lookDown(moveRadians)
      break
    // 相机翻滚
    case 'z':
      viewer.value.camera.twistLeft(moveRadians)
      break
    case 'x':
      viewer.value.camera.twistRight(moveRadians)
      break
    default:
      break
  }
}

onMounted(async () => {
  const v = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
  })

  v.cesiumWidget.creditContainer.style.display = 'none'
  viewer.value = v

  /**
   *  1、屏幕坐标系，二维笛卡尔坐标系，Cartesian2 类型
   *  2、地理坐标系，WGS-84 坐标系，Cartographic 类型（经度、纬度、高度）
   *  3、空间直角坐标系，三维笛卡尔坐标系，Cartesian3 类型
   */
  // 角度与弧度转换
  const radians = Cesium.Math.toRadians(90)
  console.log('radians: ', radians)
  // 弧度转角度
  const degrees = Cesium.Math.toDegrees(Math.PI)
  console.log('degrees: ', degrees)
  // 将经纬度转为笛卡尔坐标（经度、纬度、高度）
  const cartesian3 = Cesium.Cartesian3.fromDegrees(98.5, 20.4, 100)
  console.log('cartesian3: ', cartesian3)
  // 将笛卡尔坐标转为经纬度
  const cartographic = Cesium.Cartographic.fromCartesian(cartesian3)
  console.log('cartographic ', cartographic)

  /**
   * 设置相机
   */
  const position = Cesium.Cartesian3.fromDegrees(113.3191, 23.092, 3000)
  // 设置相机位置
  v.camera.setView({
    // 指定相机位置
    destination: position,
    // 指定相机视角
    orientation: {
      // 指定相机朝向
      heading: Cesium.Math.toRadians(0),
      // 指定相机俯仰角
      pitch: Cesium.Math.toRadians(-20),
      // 指定相机滚转角
      roll: 0,
    },
  })

  // 使相机飞往某个位置（直接缩放到某个位置使用 zoomTo）
  v.camera.flyTo({
    destination: position,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-50),
      roll: 0,
    },
  })

  // 设置按键移动相机
  document.addEventListener('keydown', onKeyDown)

  /**
   * 3D 建筑
   */
  // 使用 OSM 数据
  v.scene.primitives.add(await Cesium.createOsmBuildingsAsync())

  /**
   * 点、标签等
   */
  const position2 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 600)
  v.entities.add({
    // 位置
    position: position2,
    // 创建点
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 4,
    },
    // 创建标签
    label: {
      text: '广州塔',
      font: '24px sans-serif',
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.RED,
      outlineWidth: 4,
      // FILL - 填充文字 / OUTLINE - 勾勒轮廓 / FILL_AND_OUTLINE - 填充文字和勾勒轮廓
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      // 偏移量
      pixelOffset: new Cesium.Cartesian2(0, -24),
      // 显示位置
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
    // 广告牌
    billboard: {
      image: '/texture/gzt.png',
      width: 40,
      height: 40,
      pixelOffset: new Cesium.Cartesian2(-8, -16),
      horizontalOrigin: Cesium.HorizontalOrigin.RIGHT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    },
  })

  /**
   * 添加模型
   */
  const position3 = Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 1500)
  v.entities.add({
    name: 'AirPlane',
    position: position3,
    model: {
      uri: '/model/Air.glb',
      // 最小像素
      minimumPixelSize: 128,
      // 模型轮廓
      silhouetteSize: 4,
      // 轮廓颜色
      silhouetteColor: Cesium.Color.RED,
      // 距离相机距离多远距离显示模型（范围）
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
    },
  })

  /**
   * 添加线
   * https://sandcastle.cesium.com/?src=Polyline.html&label=All
   */
  v.entities.add({
    name: 'Polyline',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        113.3191, 23.109, 600, 113.33, 23.12, 0,
      ]),
      width: 10,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.2,
        taperPower: 0.5,
        color: Cesium.Color.CORNFLOWERBLUE,
      }),
    },
  })
})

onUnmounted(() => {
  if (viewer.value) viewer.value.destroy()

  document.removeEventListener('keydown', onKeyDown)
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
