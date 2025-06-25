import React, { useState, useEffect } from 'react'
import { Button, InputLabel } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import actAPI from '../../../API/activities/actAPI'
import ActResults from '../../tables/activities/ActResults'
import SearchLoading from '../../loading/SearchLoading'
import styles from '../../../Style'

const SearchAct = () => {
  const [result, setResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const MSSVmaxlength = 11
  const handleInputChange = (event) => {
    const value = event.target.value
    if (value.length <= MSSVmaxlength) {
      setInputValue(value.toUpperCase())
    }
  }

  const handleSearchClick = () => {
    if (inputValue === '') {
      setShowResults(false)
      return
    }
    setIsLoading(true)
    actAPI.getByStudentID(inputValue).then((response) => {
      setResult(response)
    })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false)
        setShowResults(true)
      })
  }

  useEffect(() => {}, [showResults])

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
        <div style={styles.formLabel}>
          <div style={{width: '100%'}}>
            <InputLabel style={ styles.customInputLabel }>Nhập MSSV</InputLabel>
          </div>
          <div style={{width: '100%'}}>
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
            <FontAwesomeIcon style={styles.icon} icon={faMagnifyingGlass} flip/>Tra cứu
          </Button>
        </div>
      </form>
      {isLoading ? (<SearchLoading />) : (showResults && <ActResults results={result} />)}
    </div>
  )
}

export default SearchAct
