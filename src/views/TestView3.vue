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

  /**
   * 纹理
   */
  // 颜色纹理
  // const material = new Cesium.ColorMaterialProperty(new Cesium.Color(1.0, 1.0, 1.0, 1.0))
  // 棋盘纹理
  // const material = new Cesium.CheckerboardMaterialProperty({
  //   evenColor: Cesium.Color.RED,
  //   oddColor: Cesium.Color.YELLOW,
  //   // 4 * 4
  //   repeat: new Cesium.Cartesian2(4, 4),
  // })
  // 条纹纹理
  // const material = new Cesium.StripeMaterialProperty({
  //   evenColor: Cesium.Color.WHITE,
  //   oddColor: Cesium.Color.BLACK,
  //   repeat: 8,
  // })
  // 网格纹理
  const material = new Cesium.GridMaterialProperty({
    color: Cesium.Color.YELLOW,
    cellAlpha: 0.2,
    // 4 * 4
    lineCount: new Cesium.Cartesian2(4, 4),
    // 竖直、水平宽度
    lineThickness: new Cesium.Cartesian2(4.0, 2.0),
  })
  v.entities.add({
    rectangle: {
      // 西经、南纬、东经、北纬
      coordinates: Cesium.Rectangle.fromDegrees(90, 20, 110, 30),
      material: material,
    },
  })

  /**
   * 创建矩形
   * primitive 方式
   */
  // 1、创建几何体
  const rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
    // 距离地球表面高度
    height: 0,
    // 顶点格式
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  })

  // 2、创建实例
  const instance = new Cesium.GeometryInstance({
    id: 'redRect',
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED.withAlpha(0.5)),
    },
  })

  // 第二个实例，演示用
  const instance2 = new Cesium.GeometryInstance({
    id: 'blueRect',
    geometry: new Cesium.RectangleGeometry({
      rectangle: Cesium.Rectangle.fromDegrees(140, 20, 160, 30),
      // 距离地球表面高度
      height: 300000,
      // 顶点格式
      vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    }),
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.BLUE.withAlpha(0.5)),
    },
  })

  // 3、设置外观
  const appearance = new Cesium.PerInstanceColorAppearance({
    flat: true,
  })

  // 4、创建图元
  const primitive = new Cesium.Primitive({
    geometryInstances: [instance, instance2], // 单个可以不用数组
    appearance: appearance,
  })

  // 5、添加到场景
  v.scene.primitives.add(primitive)

  // 动态修改图元属性
  interval.value = setInterval(() => {
    const attributes = primitive.getGeometryInstanceAttributes('blueRect')
    attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(
      Cesium.Color.fromRandom({ alpha: 0.5 })
    )
  }, 1000)

  // 交互
  const handler = new Cesium.ScreenSpaceEventHandler(v.scene.canvas)
  handler.setInputAction((movement) => {
    // 选中的对象
    const pickedObject = v.scene.pick(movement.position)
    // id 为 string 的对象点击后变为黄色
    if (Cesium.defined(pickedObject) && typeof pickedObject.id === 'string') {
      const attributes = primitive.getGeometryInstanceAttributes(pickedObject.id)
      attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(
        Cesium.Color.YELLOW.withAlpha(0.5)
      )
    }
    // 鼠标左键点击事件
    // https://cesium.com/learn/cesiumjs/ref-doc/global.html?classFilter=screen#ScreenSpaceEventType
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  /**
   * 创建线
   */
  // 颜色材质
  // const lineMaterial = Cesium.Color.RED
  // 虚线材质
  // const lineMaterialDash = new Cesium.PolylineDashMaterialProperty({
  //   dashLength: 30,
  //   color: Cesium.Color.RED,
  // })
  // 箭头材质
  // const lineMaterialArrow = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED)
  // 发光材质
  const lineMaterialGlow = new Cesium.PolylineGlowMaterialProperty({
    glowPower: 0.8,
    taperPower: 0.7,
    color: Cesium.Color.RED,
  })

  // 直线
  v.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([70, 40, 150, 40]),
      width: 5,
      material: lineMaterialGlow,
    },
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
