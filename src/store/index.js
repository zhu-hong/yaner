import dayjs from 'dayjs'
import { createStore } from 'vuex'
import { axiosGet } from '../utils'

export default createStore({
  state: {
    bills: [],
    renderBills: [],
    index: 0,
    count: 10,
  },
  mutations: {
    setBills(state, data) {
      state.bills = data
    },
    addBills(state) {
      const { index, count } = state
      for (let i = index; i < index + count; i++) {
        console.log(index);
        if (i < state.bills.length) {
          state.renderBills.push(state.bills[i])
          state.index++
        }
      }
    },
  },
  actions: {
    async getBills(ctx) {
      const { data } = await axiosGet('/bill')
      ctx.commit('setBills', data)
      ctx.commit('addBills')
    },
  },
})