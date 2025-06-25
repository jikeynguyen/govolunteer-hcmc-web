import React from 'react'
import { CircularProgress } from '@mui/material'
import styles from '../../Style'
const CertiLoading = () => {
  return (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingSpinner}><CircularProgress color="primary" /></div>
      <span style={styles.loadingText}>Đang in giấy chứng nhận...</span>
    </div>
  )
}

export default CertiLoading
