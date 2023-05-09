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

  /**
   * 使用 appearance 外观与贴图材质（Cesium.Material.fromType 方式）
   */
  // --- 图片贴图 ---
  const imageMaterial = new Cesium.Material.fromType('Image', {
    image: './texture/logo.png',
    repeat: new Cesium.Cartesian2(1.0, 1.0),
  })

  // --- 漫反射贴图 ---
  const diffuseMaterial = new Cesium.Material.fromType('DiffuseMap', {
    image: './texture/logo.png',
  })

  // --- 网格贴图 ---
  const gridMaterial = new Cesium.Material.fromType('Grid', {
    color: Cesium.Color.AQUA.withAlpha(0.5),
    cellAlpha: 0.2,
    lineCount: new Cesium.Cartesian2(4.0, 4.0),
    lineThickness: new Cesium.Cartesian2(4.0, 4.0),
  })

  // --- 水波纹贴图纹理 ---
  const waterMaterial = new Cesium.Material.fromType('Water', {
    normalMap: './Assets/Textures/waterNormals.jpg',
    distortion: 0.25,
    color: Cesium.Color.AQUA.withAlpha(0.5),
  })

  // 1、创建几何体
  const rectGeometry = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(70, 20, 90, 30),
    // 距离地球表面高度
    height: 0,
    // 顶点格式
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  })

  const rectGeometry2 = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(95, 20, 115, 30),
    height: 0,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  })

  const rectGeometry3 = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(120, 20, 140, 30),
    height: 0,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  })

  const rectGeometry4 = new Cesium.RectangleGeometry({
    rectangle: Cesium.Rectangle.fromDegrees(145, 20, 165, 30),
    height: 0,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  })

  // 2、创建实例
  const instance = new Cesium.GeometryInstance({
    id: 'rect1',
    geometry: rectGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED.withAlpha(0.5)),
    },
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  })

  const instance2 = new Cesium.GeometryInstance({
    id: 'rect2',
    geometry: rectGeometry2,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  })

  const instance3 = new Cesium.GeometryInstance({
    id: 'rect3',
    geometry: rectGeometry3,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  })

  const instance4 = new Cesium.GeometryInstance({
    id: 'rect4',
    geometry: rectGeometry4,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
  })

  // 3、外观，设置几何体与地球表面平行，在计算顶点属性时可以节省内存
  const appearance = new Cesium.EllipsoidSurfaceAppearance({
    material: imageMaterial,
    aboveGround: false,
  })

  const appearance2 = new Cesium.EllipsoidSurfaceAppearance({
    material: diffuseMaterial,
    aboveGround: false,
  })

  const appearance3 = new Cesium.EllipsoidSurfaceAppearance({
    material: gridMaterial,
    aboveGround: false,
  })

  const appearance4 = new Cesium.EllipsoidSurfaceAppearance({
    material: waterMaterial,
    aboveGround: false,
  })

  // 4、图元
  const primitive = new Cesium.Primitive({
    geometryInstances: instance,
    appearance: appearance,
    show: true,
  })

  const primitive2 = new Cesium.Primitive({
    geometryInstances: instance2,
    appearance: appearance2,
    show: true,
  })

  const primitive3 = new Cesium.Primitive({
    geometryInstances: instance3,
    appearance: appearance3,
    show: true,
  })

  const primitive4 = new Cesium.Primitive({
    geometryInstances: instance4,
    appearance: appearance4,
    show: true,
  })

  // 5、添加到场景
  v.scene.primitives.add(primitive)
  v.scene.primitives.add(primitive2)
  v.scene.primitives.add(primitive3)
  v.scene.primitives.add(primitive4)
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
