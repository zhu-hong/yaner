<script setup>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { getOverview, debounce } from '../../utils'
import Item from './item.vue'

const store = useStore()
store.dispatch('getBills')

const renderBills = computed(() => store.state.renderBills)
const bills = computed(() => store.state.bills)

const overview = getOverview(bills)

const handleScroll = debounce(($event) => {
  const el = $event.target;

  if (el.scrollHeight - (el.clientHeight + el.scrollTop) < 50) {
    store.commit('addBills')
  }
}, 1000, false)
</script>

<template>
  <div :class="$style.stats">
    <div style="background: #34d399;">
      总支出:
      <span>{{ overview.get('in') }}</span>
    </div>
    <div style="background: #dc2626;">
      总收入:
      <span>{{ overview.get('out') }}</span>
    </div>
  </div>

  <div :class="$style.listWrap" @scroll="handleScroll">
    <div :class="$style.tip">
      ✨
      <span>{{ bills.length }}</span>条记录(点击查看详情)
    </div>
    <div :class="$style.list">
      <template v-for="bill of renderBills" :key="bill.bid">
        <item :bill="bill"></item>
      </template>
      <p
        v-text="store.state.index === store.state.bills.length ? '没有数据了' : '加载中'"
        style="text-align: center; margin: auto 10px;"
      ></p>
    </div>
  </div>
</template>

<style module>
.stats {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.stats > div {
  flex: 1;
  padding: 20px;
  font-size: 0.7rem;
}
.stats > div > span {
  font-size: 1.3rem;
  font-weight: bold;
}
.listWrap {
  margin-top: 10px;
  color: white;
  height: 83vh;
  overflow-y: scroll;
}
.tip span {
  font-size: 2rem;
  color: #f87171;
  margin-right: 1rem;
}
.list {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}
</style>