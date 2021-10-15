<script setup>
const props = defineProps({
  routes: Array,
  index: {
    type: Number,
    default: 2,
  },
})
</script>

<script>
export default {
  name: 'z-nav'
}
</script>

<template>
  <nav :class="$style.nav">
    <template v-for="route of routes" :key="route.index">
      <router-link :to="{ name: route.name }">
        <img :src="route.icon" alt="route.name" />
      </router-link>
    </template>
    <div :class="$style.slider"></div>
  </nav>
</template>

<style module>
.nav {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-around;
  z-index: 100;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
  overflow: hidden;
}
.nav > a {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / v-bind("routes.length"));
  height: 100%;
  z-index: -1;
  background-color: #5352ed;
  transform: translateX(calc(100% * v-bind("props.index")));
  transition: 0.3s linear all;
}
</style>