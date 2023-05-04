<script setup>
import { RouterView } from 'vue-router'
import * as Cesium from 'cesium'
import Config from '@/core/config'
import { useRouter } from 'vue-router'
import { routes } from '@/router'

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

const router = useRouter()
const onPush = (path) => {
  router.push(path)
}
</script>

<template>
  <header>
    <button v-for="item in routes" :key="item.path" @click="() => onPush(item.path)">
      {{ item.name }}
    </button>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  width: 100vw;
  height: 30px;
  padding: 0 16px;
  overflow-x: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #d9d9d9;
  box-sizing: border-box;
}

main {
  width: 100vw;
  height: calc(100vh - 30px);
}

::-webkit-scrollbar {
  display: none;
}
</style>
