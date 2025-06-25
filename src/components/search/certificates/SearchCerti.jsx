import React, { useState, useEffect } from 'react'
import { Button, InputLabel, Alert } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import certiStudentsAPI from '../../../API/certificates/certiStudentsAPI'
import certiListAPI from '../../../API/certificates/certiListAPI'
import CertiResults from '../../tables/certificates/CertiResults'
import SearchLoading from '../../loading/SearchLoading'
import styles from '../../../Style'

const SearchCerti = () => {
  const [studentActs, setStudentActs] = useState([])
  const [certiList, setCertiList] = useState([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resultsLoading, setResultsLoading] = useState(false)
  const [showStudentActs, setShowStudentActs] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const MSSVmaxlength = 11
  const handleInputChange = (event) => {
    const value = event.target.value
    if (value.length <= MSSVmaxlength) {
      setInputValue(value.toUpperCase())
    }
  }
  const handleSearchClick = () => {
    if (inputValue === '') {
      setShowStudentActs(false)
      return
    }
    setIsLoading(true)
    setResultsLoading(true)
    Promise.all([certiListAPI.getCertiID(inputValue), certiStudentsAPI.getByStudentID(inputValue)])
      .then(([certiListResponse, studentActsResponse]) => {
        setCertiList(certiListResponse)
        setStudentActs(studentActsResponse)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
        setResultsLoading(false)
        setShowStudentActs(true)
      })
  }

  useEffect(() => {}, [showStudentActs])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    handleSearchClick()
  }

  const inputStyle = {...styles.customInput, ...(isInputFocused ? styles.customInputFocused : {})}
  const buttonStyle = {
    ...styles.button,
    backgroundColor: inputValue.length !== MSSVmaxlength ? 'gray' : styles.button.backgroundColor,
    color: inputValue.length !== MSSVmaxlength ? 'lightgray' : styles.button.color,
    cursor: inputValue.length !== MSSVmaxlength ? 'not-allowed' : 'pointer'
  }
    return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div style={{paddingBottom: '16px'}}>
            <Alert variant="filled" severity="info" style={styles.notiBg}>
              Lưu ý: Hệ thống hiển thị giấy chứng nhận cấp online từ năm học 2024 - 2025
            </Alert>
          </div>
        <div style={styles.formLabel}>
          <div style={{width: '100%'}}>
            <InputLabel style={styles.customInputLabel}>Nhập MSSV</InputLabel>
          </div>
          <div>
            <input
              style={inputStyle}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              maxLength={MSSVmaxlength}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </div>
        </div>
        <div style={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={buttonStyle}
            disabled={inputValue.length !== MSSVmaxlength}
          >
            <FontAwesomeIcon style={styles.icon} icon={faInbox} beatFade/>Yêu cầu giấy
          </Button>
        </div>
      </form>
      {isLoading ? (<SearchLoading />) : (showStudentActs && <CertiResults studentActs={studentActs} certiList={certiList} isLoading={resultsLoading}/>)}
    </div>
  )
}

export default SearchCerti
