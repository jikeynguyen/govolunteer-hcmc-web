import axiosCertiStudents from './axiosCertiStudents.js'
const certiStudentsAPI = {
    getAll: () => {
        const url = ''
        return axiosCertiStudents.get(url)
    },
    getByStudentID: async (studentID) => {
        const data = await certiStudentsAPI.getAll()
        const rows = data.values.slice(1)
        return rows.filter(row => row[0] === studentID)
    }
}

export default certiStudentsAPI
