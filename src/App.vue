<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watchEffect } from '@vue/runtime-core'
import bill from './assets/images/bill.svg'
import add from './assets/images/add.svg'
import me from './assets/images/me.svg'
import stats from './assets/images/stats.svg'
import login from './assets/images/login.svg'

const router = useRouter()
const route = useRoute()
const routes = []
const icons = { bill, add, me, stats, login }

const index = ref()
const title = ref('')

router.getRoutes().forEach(({ name }) => {
  const route = {}
  route.name = name
  route.icon = icons[name]
  routes.push(route)
})

watchEffect(
  () => {
    index.value = route.meta.index
    title.value = route.meta.title
  }
)
</script>

<template>
  <z-header :title="title"></z-header>
  <div :class="$style.container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
  <z-nav :routes="routes" :index="index"></z-nav>
</template>

<style module>
.container {
  position: relative;
  width: 100%;
  height: 83vh;
  overflow-y: auto;
  padding: 20px;
}
</style>
