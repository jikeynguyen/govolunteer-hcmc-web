import React, { useState } from 'react'
import { Select, MenuItem, FormControl, Table, TableBody, TableRow, TableCell, TablePagination, InputLabel } from '@mui/material'
import ActTableHeader from './ActTableHeader'
import styles from '../../../Style'
const ActResults = ({ results }) => {
    if (!results || results.length === 0) {
      return (
        <div style={styles.notFoundContainer}>
          <span style={styles.notFoundText}>Không tìm thấy dữ liệu</span>
        </div>
      )
    }
    const [semester, setSemester] = useState('1')
    const semesters = [...new Set(results?.map((row) => row[10]))]
    const studentName = results[0]?.[5]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const filteredResults = semester === '1' ? results : results.filter((row) => row[10] === semesters[parseInt(semester) - 2])
    const paginatedResults = filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    const handleSemesterChange = (event) => { setSemester(event.target.value) }
    const handleChangePage = (event, newPage) => { setPage(newPage) }
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }

    return (
      <div style={styles.displayContainer}>
        <span style={styles.formControlText}>Tên sinh viên: {studentName}</span>
        <div style={styles.formControlContainer}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Năm học</InputLabel>
            <Select
              labelId="semester-select-label"
              label="Năm học"
              id="semester-select"
              value={semester}
              autoWidth
              onChange={handleSemesterChange}
            >
              <MenuItem value="1">Hiện tất cả</MenuItem>
              {semesters.map((data, index) => (
                <MenuItem key={index + 2} value={(index + 2).toString()}>
                  {data}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={styles.resultContainer}>
          <Table style={{width: '100%'}}>
            <ActTableHeader />
            <TableBody>
              {paginatedResults.map((row, index) => {
                if (semester === '1' || row[10] === semesters[parseInt(semester) - 2]) {
                  return (
                    <TableRow key={'Result' + index}>
                      <TableCell style={styles.tableRowCenter}>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell style={styles.tableRowLeft}>{row[6]}</TableCell>
                      <TableCell style={styles.tableRowCenter}>{row[2]}</TableCell>
                      <TableCell style={styles.tableRowCenter}>{row[8]}</TableCell>
                      <TableCell style={styles.tableRowRight}>{row[7]}</TableCell>
                    </TableRow>
                  )
                }
                else return null
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 25, results.length]}
            component='div'
            count={results.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Dòng/trang"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
  )
}

export default ActResults
