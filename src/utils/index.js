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
    bills.value?.forEach((item) => {
      let type = item.inout === 1 ? 'in' : 'out'
      let total = map.get(type) || 0
      map.set(type, total + item.amount)
    })
    return map
  })
}

const useDateSpan = (date) => dayjs(date).fromNow()

const useDateCn = (date) => dayjs(date).format('YYYY年MM月DD日')

function debounce(fn, time, triggerNow) {
  let timer = null;

  function debounced() {
    let [__this, args, res] = [this, arguments, undefined];

    if (timer) {
      clearTimeout(timer);
    }

    if (triggerNow) {
      let exec = !timer;

      if (exec) {
        res = fn.apply(__this, args);
      }

      timer = setTimeout(() => {
        timer = null;
      }, time)
    } else {
      timer = setTimeout(() => {
        res = fn.apply(__this, args);
      }, time)
    }

    return res;
  }

  debounced.remove = function () {
    clearTimeout(timer);
    timer = null;
  }

  return debounced;
}

export {
  axiosGet,
  axiosPost,
  loginRules,
  loading,
  getOverview,
  useDateSpan,
  useDateCn,
  debounce,
}