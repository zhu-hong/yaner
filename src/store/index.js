import { createStore } from 'vuex'
import { axiosGet } from '../utils'

export default createStore({
  state: {
    bills: [],
  },
  mutations: {
    setBills(state, data) {
      state.bills = data
    },
  },
  getters: {
    in: (state) => state.bills.filter(item => item.inout === 1),
    out: (state) => state.bills.filter(item => item.inout === -1),
  },
  actions: {
    async getBills(ctx) {
      const { data } = await axiosGet('/bill')
      ctx.commit('setBills', data)
    },
  },
})