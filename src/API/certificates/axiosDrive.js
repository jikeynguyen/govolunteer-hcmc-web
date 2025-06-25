import axios from 'axios'
const axiosDrive = axios.create({
  baseURL: 'https://www.googleapis.com/drive/v3/files',
  params: {
    key: 'API key here'
  }
})

axiosDrive.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
  }
)

export default axiosDrive
