import axios from 'axios'
import { ref } from '@vue/reactivity'

const loading = ref(false)

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

export {
  axiosGet,
  axiosPost,
  loginRules,
  loading,
}