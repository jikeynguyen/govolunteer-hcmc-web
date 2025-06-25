import axiosCertiList from './axiosCertiList.js'
import axiosDrive from './axiosDrive.js'
import certiStudentsAPI from './certiStudentsAPI.js'

const certiListAPI = {
    getAll: () => {
        const url = ''
        return axiosCertiList.get(url)
    },
    getCertiID: async (studentID) => {
        try {
            const studentData = await certiStudentsAPI.getByStudentID(studentID)
            const studentActivityIDs = studentData.map(row => row[3])
            const certiListData = await certiListAPI.getAll()
            const certiListRows = certiListData.values.slice(1)
            const fileIDs = certiListRows
                .filter(item => studentActivityIDs.includes(item[0]))
                .map(item => item[2])
            const files = await Promise.all(fileIDs.map(fileID => certiListAPI.getCertiFile(fileID)))
            return files
        }
        catch (error) {
            console.error('Error retrieving certificates:', error)
            throw error
        }
    },
    getCertiFile: (certiID) => {
        const url = `/${certiID}`
        return axiosDrive.get(url, {
            responseType: 'arraybuffer',
            params: {
                alt: 'media',
                source: 'downloadUrl'
            }
        })
    }
}

export default certiListAPI
