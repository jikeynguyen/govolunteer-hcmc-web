import React, { useEffect, useState } from 'react'
import { Select, MenuItem, Button, FormControl, Table, TableBody, TableRow, TableCell, TablePagination, InputLabel } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import CertiTableHeader from './CertiTableHeader'
import CertiLoading from '../../loading/CertiLoading'
import PDFGen from '../../pdf/PDFGenerator'
import JSZip from 'jszip'
import styles from '../../../Style'

const CertiResults = ({ studentActs, certiList, isLoading }) => {
  if (isLoading) {
    return <CertiLoading />
  }

  if ((studentActs.length === 0 && certiList.length === 0) || (!studentActs || !certiList)) {
    return (
      <div style={styles.notFoundContainer}>
        <span style={styles.notFoundText}>Không tìm thấy dữ liệu</span>
      </div>
    )
  }

  const [year, setYear] = useState('1')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const years = [...new Set(studentActs.map((row) => row[5].split('/')[2]))]
  const studentName = studentActs[0]?.[1]
  const studentID = studentActs[0]?.[0]
  const [preGeneratedPDFs, setPreGeneratedPDFs] = useState([])
  const [downloadLink, setDownloadLink] = useState(null)
  const handleYearChange = (event) => { setYear(event.target.value) }
  const handleChangePage = (event, newPage) => { setPage(newPage) }
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value)
      setPage(0)
  }

  const preGeneratePDFs = async () => {
    try {
      const pdfBlobs = await Promise.all(
        certiList.map((certiFile, index) => {
          const deptName = studentActs[index] ? studentActs[index][2] : '';  
          return PDFGen({ certiFile, studentName, deptName });
        })
      )
      setPreGeneratedPDFs(pdfBlobs)
    } catch (error) {
      console.error('Error pre-generating PDFs:', error)
    }
  }

  const generateZipFile = async () => {
    try {
      const zip = new JSZip()
      preGeneratedPDFs.forEach((pdfBlob, i) => {
        const activityName = studentActs[i] ? studentActs[i][4] : ''
        zip.file(`${studentName}_${activityName}.pdf`, pdfBlob)
      })
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const zipUrl = URL.createObjectURL(zipBlob)
      setDownloadLink(zipUrl)
    } catch (error) {
      console.error('Error creating zip file:', error)
    }
  }

  useEffect(() => {
    if (certiList.length > 0) {
      preGeneratePDFs()
    }
  }, [certiList, studentID, studentName, studentActs])

  useEffect(() => {
    if (preGeneratedPDFs.length > 0) {
      generateZipFile()
    }
  }, [preGeneratedPDFs])

  const handleDownloadPdf = (index) => {
    const pdfBlob = preGeneratedPDFs[index]
    if (pdfBlob) {
      const fileUrl = URL.createObjectURL(pdfBlob)
      const activityName = studentActs[index] ? studentActs[index][4] : ''
      const a = document.createElement('a')
      a.href = fileUrl
      a.download = `${studentName}_${activityName}.pdf`
      a.click()
    }
  }

  return (
    <div style={styles.displayContainer}>
      <span style={styles.formControlText}>Tên sinh viên: {studentName}</span>
        <div style={styles.formControlContainer}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Năm học</InputLabel>
            <Select
              labelId="year-select-label"
              label="Năm học"
              id="year-select"
              value={year}
              autoWidth
              onChange={handleYearChange}
            >
              <MenuItem value="1">Hiện tất cả</MenuItem>
              {years.map((data, index) => (
                <MenuItem key={index + 2} value={(index + 2).toString()}>
                  {data}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={styles.resultContainer}>
          <Table stickyHeader style={{width: '100%'}}>
            <CertiTableHeader />
            <TableBody>
              {studentActs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                if (year === '1' || row[4] === years[parseInt(year) - 2]) {
                  return (
                    <TableRow key={'Result' + index}>
                      <TableCell style={styles.tableRowCenter}>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell style={styles.tableRowLeft}>{row[4]}</TableCell>
                      <TableCell style={styles.tableRowCenter}>{row[6]}</TableCell>
                      <TableCell style={styles.tableRowCenter}>{row[5]}</TableCell>
                      <TableCell style={styles.tableRowCenter}>
                        <Button
                          variant="contained"
                          size="large"
                          style={styles.button}
                          onClick={() => handleDownloadPdf(index)}>
                          <FontAwesomeIcon style={styles.icon} icon={faDownload} bounce />Tải giấy CN
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                } else return null
              })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 25, studentActs.length]}
            component='div'
            count={studentActs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Dòng/trang"
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <div style={styles.buttonContainer}>
            <Button style={styles.button} variant="contained" color="secondary" href={downloadLink} download={`${studentID}_${studentName}.zip`}>
                <FontAwesomeIcon style={styles.icon} icon={faDownload} bounce />Tải tất cả
            </Button>
          </div>
        </div>
    </div>
  )
}

export default CertiResults
