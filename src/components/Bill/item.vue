<script setup>
import { useDateSpan, useDateCn } from '../../utils'
import { Modal as modal } from 'ant-design-vue'

const props = defineProps({
  bill: Object,
})

const { amount, date, tip, inout } = props.bill
const color = inout === 1 ? '#34d399' : '#dc2626'
const cnDate = useDateCn(date)
const spanDate = useDateSpan(date)

const showDetali = () => {
  modal.info({
    title: '账单详情',
    content: `${cnDate}${tip}${inout === 1 ? '收入' : '花费了'}${amount}元`,
  })
}
</script>

<template>
  <div :style="{ background: color }" :class="$style.bill" @click="showDetali">
    <span>{{ amount }}</span>
    <span>{{ spanDate }}</span>
  </div>
</template>

<style module>
.bill {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 1rem;
}
</style>