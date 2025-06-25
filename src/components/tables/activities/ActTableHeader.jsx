import React from 'react'
import { TableHead, TableRow, TableCell } from '@mui/material'
import styles from '../../../Style'
const ActTableHeader = () => {
  const headers = [
    { label: 'STT', style: styles.tableCol10 },
    { label: 'Tên HĐ', style: styles.tableCol25 },
    { label: 'Vai trò', style: styles.tableCol20 },
    { label: 'Đơn vị tổ chức', style: styles.tableCol25 },
    { label: 'Thời gian tổ chức', style: styles.tableCol20 }
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

export default ActTableHeader
