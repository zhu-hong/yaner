<script setup>
import { reactive, ref } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import { axiosPost, loginRules, loading } from '../utils'
import { message as $message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const instance = getCurrentInstance()
const router = useRouter()

const formRef = ref(null)
const formData = reactive({
  account: '',
  password: '',
})

const handleFinish = async (formData) => {
  const { status, message, token } = await axiosPost({ url: '/user', data: formData })
  if (status !== 200) {
    $message.error(message)
    return
  }
  $message.success(message)
  localStorage.setItem('token', token)
  router.push({ name: 'me' })
}

const resetFormData = () => {
  instance.refs.formRef.resetFields()
}
</script>

<template>
  <div :class="$style.formWrap">
    <a-form
      ref="formRef"
      :model="formData"
      :rules="loginRules"
      @finish="handleFinish"
    >
      <a-form-item ref="account" name="account" has-feedback>
        <a-input v-model:value="formData.account" prefix="账号: " />
      </a-form-item>

      <a-form-item ref="password" name="password">
        <a-input-password v-model:value="formData.password" prefix="密码: " />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" style="color: black;">登录</a-button>
        <a-button
          type="primary"
          danger
          @click="resetFormData"
          style="color: black; margin-left: 2rem;"
        >重置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style module>
.formWrap {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>