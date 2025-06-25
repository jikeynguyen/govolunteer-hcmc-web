import axios from 'axios'
const GOOGLE_SHEET_PROPS = {
    spreadsheetId: '1UHl5csos2pj_XHNHnGMEyhLGAS53vplwHygRXC3YNvk',
    apiKey: 'API key here',
    sheetName: 'DS SV cấp giấy chứng nhận'
}

const axiosCertiStudents = axios.create({
    baseURL: `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_PROPS.spreadsheetId}/values/${GOOGLE_SHEET_PROPS.sheetName}?key=${GOOGLE_SHEET_PROPS.apiKey}`
})

axiosCertiStudents.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data)
        }
        return Promise.reject(error.message)
    }
  )

export default axiosCertiStudents
