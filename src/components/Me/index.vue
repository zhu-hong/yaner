<script setup>
import { axiosGet } from '../../utils'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import loadSvg from '../../assets/images/load.svg'
import { useRouter } from 'vue-router'

const router = useRouter()
const userInfo = ref({
  avatar: loadSvg,
  nikename: '',
})

onMounted(async () => {
  const { data: { userInfo: { avatar, nikename } } } = await axiosGet('/user')
  userInfo.value.avatar = avatar
  userInfo.value.nikename = nikename
})

const logout = () => {
  localStorage.clear()
  router.push({ name: 'login' })
}
</script>

<template>
  <div :class="$style.infoWrap">
    <div :class="$style.avatar">
      <a-image :src="userInfo.avatar" width="150" :preview="false" />
    </div>
    <p :class="$style.nikename">{{ userInfo.nikename }}</p>
    <a-button
      type="primary"
      @click="logout"
      style="height: 50px;font-size: 1.2rem;color: black;"
    >退出登录</a-button>
  </div>
</template>

<style module>
.infoWrap {
  display: grid;
  grid-template-columns: repeat(1fr, 3);
  justify-content: center;
  gap: 2rem;
  transform: translateY(10%);
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}
.nikename {
  margin: 0;
  height: 4rem;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}
</style>