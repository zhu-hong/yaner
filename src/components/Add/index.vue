<script setup>
import { ref, reactive } from '@vue/reactivity'
import dayjs from 'dayjs'
import { axiosPost, billRules, loading } from '../../utils'
import { message as $message } from 'ant-design-vue'
import { getCurrentInstance } from '@vue/runtime-core'
import { useStore } from 'vuex'

const instance = getCurrentInstance()
const store = useStore()

const formRef = ref(null)
const formData = reactive({
  amount: null,
  date: null,
  inout: null,
  tip: null,
})

const handleFinish = async ({ amount, inout, date, tip }) => {
  const data = {
    amount,
    inout,
    date: dayjs(date).format('YYYY-MM-DD'),
    tip: tip || '',
  }
  const { status, message } = await axiosPost({ url: '/bill', data })
  instance.refs.formRef.resetFields()
  if (status !== 200) {
    $message.error(message)
    return
  }
  store.dispatch('getBills')
  $message.info(message)
}
</script>

<template>
  <div :class="$style.formWarp">
    <a-form ref="formRef" :model="formData" :rules="billRules" @finish="handleFinish">
      <a-form-item ref="amount" name="amount">
        <a-input v-model:value="formData.amount" prefix="输入金额" allow-clear />
      </a-form-item>

      <a-form-item ref="date" name="date">
        <a-date-picker v-model:value="formData.date" placeholder="选择日期" style="width: 100%;" />
      </a-form-item>

      <a-form-item style="color: white;" label="类型" ref="inout" name="inout">
        <a-radio-group v-model:value="formData.inout">
          <a-radio value="1">收入</a-radio>
          <a-radio value="-1">支出</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item ref="tip" name="tip">
        <a-input v-model:value="formData.tip" prefix="备注" allow-clear />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="loading" style="color: black;">添加</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style module>
.formWarp {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>