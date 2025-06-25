import axios from 'axios'
const GOOGLE_SHEET_PROPS = {
    spreadsheetId: '1z9PTwcDpXvdK4RHTHXJXBN9BOq2qGNEXItBumcVzKnw',
    apiKey: 'API key here',
    sheetName: '2. DATA-DSSV HD'
}

const axiosActList = axios.create({
    baseURL: `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_PROPS.spreadsheetId}/values/${GOOGLE_SHEET_PROPS.sheetName}?key=${GOOGLE_SHEET_PROPS.apiKey}`
})

axiosActList.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data)
        }
        return Promise.reject(error.message)
    }
  )

export default axiosActList
