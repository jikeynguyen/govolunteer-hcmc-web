import React from 'react'
import { CircularProgress } from '@mui/material'
import styles from '../../Style'
const SearchLoading = () => {
  return (
    <div style={styles.loadingContainer}>
      <div style={styles.loadingSpinner}><CircularProgress color="primary" /></div>
      <span style={styles.loadingText}>Đang tìm kiếm...</span>
    </div>
  )
}

export default SearchLoading
