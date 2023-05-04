<script setup>
import { RouterView } from 'vue-router'
import * as Cesium from 'cesium'
import Config from '@/core/config'

import '../public/Widgets/widgets.css'

/**
 * https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/
 *
 * 需要将 node_modules 中 cesium/Build/Cesium 文件夹下的
 * Workers、ThirdParty、Assets、Widgets 四个文件夹复制到项目中作为静态文件，
 * 并设置 window.CESIUM_BASE_URL 指向这四个文件夹所在父文件夹的位置。
 */
window.CESIUM_BASE_URL = '/'
// 官网注册后拿到 token 并设置
Cesium.Ion.defaultAccessToken = Config.cesiumToken
// 设置相机默认视角（西经、南纬、东经、北纬）
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2)
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
