import axiosActList from './axiosActList.js'
const actAPI = {
    getAll: () => {
      const url = ''
      return axiosActList.get(url)
    },
    getByStudentID: async (studentID) => {
      const data = await actAPI.getAll()
      const rows = data.values.slice(1)
      return rows.filter(row => row[0] === studentID)
    }
}

export default actAPI
