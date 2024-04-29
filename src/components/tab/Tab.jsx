import Button from '@mui/material/Button'

import { styles } from '~/components/tab/Tab.styles'

const Tab = ({ activeTab, onClick, children }) => {
  return (
    <Button
      aria-selected={activeTab}
      onClick={onClick}
      sx={[styles.defaultTab, activeTab && styles.activeTab]}
    >
      {children}
    </Button>
  )
}

export default Tab
