<script setup>
import * as Cesium from 'cesium'
import { onMounted, onUnmounted, ref } from 'vue'

const viewer = ref()

onMounted(async () => {
  const v = new Cesium.Viewer('cesiumContainer', {
    // 是否显示信息窗口
    infoBox: false,

    // ----- 右上角按钮配置 -----
    // 是否显示搜索按钮
    // geocoder: false,
    // 是否显示 home 按钮
    // homeButton: false,
    // 是否显示切换显示模式按钮
    // sceneModePicker: false,
    // 是否显示图层选择器
    // baseLayerPicker: false,
    // 是否显示帮助按钮
    // navigationHelpButton: false,

    // ----- viewer 下方设置 -----
    // 是否显示动画
    // animation: false,
    // 是否显示下方时间轴
    // timeline: false,
    // 是否显示下方全屏按钮
    // fullscreenButton: false,

    // 设置天空盒子纹理
    skyBox: new Cesium.SkyBox({
      sources: {
        positiveX: '/texture/sky/px.jpg',
        negativeX: '/texture/sky/nx.jpg',
        positiveY: '/texture/sky/py.jpg',
        negativeY: '/texture/sky/ny.jpg',
        positiveZ: '/texture/sky/pz.jpg',
        negativeZ: '/texture/sky/nz.jpg',
      },
    }),

    // ----- 设置第三方地图 -----
    // 天地图矢量路径图
    // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    //   url: 'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211',
    //   layer: 'tdtBasicLayer',
    //   style: 'default',
    //   format: 'image/jpeg',
    //   tileMatrixSetID: 'GoogleMapsCompatible',
    // }),
    // 天地图影像服务
    // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    //   url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=30d07720fa76f07732d83c748bb84211",
    //   layer: "tdtBasicLayer",
    //   style: "default",
    //   format: "image/jpeg",
    //   tileMatrixSetID: "GoogleMapsCompatible",
    // }),
    // OSM地图
    // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
    //   url: 'https://a.tile.openstreetmap.org/',
    // }),
    // 高德矢量地图
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //   url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    //   layer: 'tdtVecBasicLayer',
    //   style: 'default',
    //   format: 'image/png',
    //   tileMatrixSetID: 'GoogleMapsCompatible',
    // }),

    // ----- 设置地图地形效果 -----
    // terrainProvider: await Cesium.createWorldTerrainAsync({
    //   // 光照效果
    //   requestVertexNormals: true,
    //   // 水面效果
    //   requestWaterMask: true,
    // }),
    // 自定义地图地形切片
    // 公开地图数据：搜索 地理空间数据云
    // 地图切片工具：http://www.cesiumlab.com/
    terrainProvider: await Cesium.CesiumTerrainProvider.fromUrl('/terrains/gz'),
  })

  // ----- 地图叠加 -----
  // const layer = v.imageryLayers.addImageryProvider(
  //   new Cesium.UrlTemplateImageryProvider({
  //     url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  //     layer: 'tdtVecBasicLayer',
  //     style: 'default',
  //     format: 'image/png',
  //     tileMatrixSetID: 'GoogleMapsCompatible',
  //   })
  // )
  // // 设置图层透明度
  // layer.alpha = 0.5

  // 隐藏 logo
  v.cesiumWidget.creditContainer.style.display = 'none'

  viewer.value = v
})

onUnmounted(() => {
  // 销毁
  if (viewer.value) viewer.value.destroy()
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>

<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
