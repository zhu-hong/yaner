<script setup>
import { ref, onMounted } from '@vue/runtime-core'
import { axiosGet, getOverview, loading } from '../../utils'

const bills = ref()

onMounted(async () => {
  let { data } = await axiosGet('/bill')
  bills.value = data
  console.log(data)
})

const overview = getOverview(bills)
</script>

<template>
  <a-spin :spinning="loading">
    <div style="min-height: 87vh;">
      <div :class="$style.stats">
        <div style="background: #34d399;">
          支出:
          <span>{{ overview.get('in') }}</span>
        </div>
        <div style="background: #dc2626;">
          收入:
          <span>{{ overview.get('out') }}</span>
        </div>
      </div>
    </div>
  </a-spin>
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
</style>