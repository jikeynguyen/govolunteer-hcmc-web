import React, { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import SearchAct from './components/search/activities/SearchAct'
import SearchCerti from './components/search/certificates/SearchCerti'
import TabPanel from './components/tabs/TabPanel'
const App = () => {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{ width: '100%' }} style={{marginTop: '-100px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Tra cứu hoạt động" />
          <Tab label="Cấp giấy chứng nhận" />
        </Tabs>
      </Box>
      <TabPanel value={activeTab} index={0}>
        <SearchAct />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <SearchCerti />
      </TabPanel>
    </Box>
  )
}

export default App
