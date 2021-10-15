<script setup>
defineProps({
  title: String,
})
</script>

<script>
export default {
  name: 'z-header',
}
</script>

<template>
  <header :class="$style.header">{{ title }}</header>
</template>

<style module>
.header {
  display: grid;
  place-items: center;
  height: 7vh;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  letter-spacing: .3rem;
  font-size: 1.3rem;
  color: white;
}
</style>