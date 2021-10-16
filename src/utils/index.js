import axios from 'axios'
import { ref, computed } from '@vue/reactivity'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import zhCn from 'dayjs/locale/zh-cn'

const loading = ref(false)

dayjs.extend(RelativeTime)
dayjs.locale(zhCn)
axios.defaults.baseURL = '/api'

axios.interceptors.request.use(config => {
  loading.value = true
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = {
      'Authorization': `Bearer ${token}`
    }
  }
  return config
})

axios.interceptors.response.use((response) => {
  loading.value = false
  if (response.data.status !== 200) {
    localStorage.clear()
  }
  return response
})

const axiosGet = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'GET',
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const axiosPost = ({ url, data }) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'POST',
      data,
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const loginRules = {
  account: [
    {
      validator: checkAccount,
      trigger: 'change',
    },
  ],
  password: [
    {
      validator: checkPassword,
      trigger: 'change',
    },
  ],
}

async function checkAccount(_, value) {
  if (value.length < 6 || value.length > 12 || new RegExp('\\D+', 'g').test(value)) {
    return Promise.reject('请输入正确格式的账号(6-12位纯数字)')
  }
  return Promise.resolve()
}

async function checkPassword(_, value) {
  if (value.length < 6 || value.length > 12 || new RegExp('\\s+', 'g').test(value)) {
    return Promise.reject('请输入正确格式的密码')
  }
  return Promise.resolve()
}

const getOverview = (bills) => {
  return computed(() => {
    const map = new Map()
    bills.value?.forEach(item => {
      let type = item.inout === 1 ? 'in' : 'out'
      let total = map.get(type) || 0
      map.set(type, total + item.amount)
    })
    return map
  })
}

const calcDate = (date) => dayjs(date).fromNow()

export {
  axiosGet,
  axiosPost,
  loginRules,
  loading,
  getOverview,
  calcDate,
}