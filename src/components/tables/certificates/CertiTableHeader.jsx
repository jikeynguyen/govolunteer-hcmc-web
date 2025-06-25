import React from 'react'
import { TableHead, TableRow, TableCell } from '@mui/material'
import styles from '../../../Style'
const CertiTableHeader = () => {
  const headers = [
    { label: 'STT', style: styles.tableCol10 },
    { label: 'Tên HĐ', style: styles.tableCol25 },
    { label: 'Đơn vị tổ chức', style: styles.tableCol25 },
    { label: 'Ngày cấp giấy', style: styles.tableCol20 },
    { label: 'Giấy CN', style: styles.tableCol20 }
  ]

  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <TableCell key={index} style={header.style}>
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default CertiTableHeader
