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
  height: 5vh;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  letter-spacing: .3rem;
  font-weight: bold;
}
</style>