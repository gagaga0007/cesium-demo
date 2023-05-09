<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { gsap } from 'gsap'
import { onMounted, onUnmounted, ref } from 'vue'

const viewer = ref()

onMounted(async () => {
  const v = new Cesium.Viewer('cesiumContainer', {
    infoBox: false,
    contextOptions: {
      // 允许使用 WebGL1 的上下文，默认是 WebGL2，语法不同
      // requestWebgl1: true,
    },
  })

  viewer.value = v

  /**
   * 使用 fabric 编写材质
   */
  const material = new Cesium.Material({
    fabric: {
      type: 'Color',
      uniforms: {
        color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      },
    },
  })

  const material2 = new Cesium.Material({
    fabric: {
      type: 'Image',
      uniforms: {
        image: './texture/logo.png',
      },
    },
  })

  // 使用着色器
  // https://github.com/CesiumGS/cesium/wiki/Fabric
  const material3 = new Cesium.Material({
    fabric: {
      uniforms: {
        uTime: 0.0,
      },
      source: /* glsl */ `
        czm_material czm_getMaterial(czm_materialInput materialInput) {
          // 生成默认的基础材质
          czm_material material = czm_getDefaultMaterial(materialInput);
          // material.diffuse = vec3(materialInput.st + uTime, 0.0);

          float strength = mod((materialInput.s + uTime) * 10.0, 1.0);
          material.diffuse = vec3(strength, 0.0, 0.0);

          return material;
        }
      `,
    },
  })

  // 设置 material3 动效
  gsap.to(material3.uniforms, {
    uTime: 1,
    duration: 2,
    repeat: -1,
    ease: 'none',
  })

  // 创建几何体
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

  // 创建实例
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

  // 外观
  const appearance = new Cesium.EllipsoidSurfaceAppearance({
    material: material,
    aboveGround: false,
  })

  const appearance2 = new Cesium.EllipsoidSurfaceAppearance({
    material: material2,
    aboveGround: false,
  })

  const appearance3 = new Cesium.EllipsoidSurfaceAppearance({
    material: material3,
    aboveGround: false,
  })

  const appearance4 = new Cesium.EllipsoidSurfaceAppearance({
    material: material3,
    aboveGround: false,
    // 也可以通过直接写着色器修改外观，使用 WebGL2 语法
    // https://blog.csdn.net/linzi19900517/article/details/129424356
    // fragmentShaderSource: /* glsl */ ``,
  })
  // 传 uniforms 需要使用这种方式
  appearance4.uniforms = { uTime: 0.0 }

  // 图元
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

  // 添加到场景
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
