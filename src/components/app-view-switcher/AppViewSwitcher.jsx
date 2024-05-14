import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ListRoundedIcon from '@mui/icons-material/ListRounded'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import { styles } from '~/components/app-view-switcher/AppViewSwitcher.styles'

const AppViewSwitcher = ({ view, setView }) => {
  const handleView = (event, newView) => {
    if (newView !== null) {
      setView(newView)
    }
  }

  return (
    <ToggleButtonGroup
      aria-label='Find offers view'
      exclusive
      onChange={handleView}
      sx={styles.buttonGroup}
      value={view}
    >
      <ToggleButton aria-label='List view' value='list'>
        <ListRoundedIcon />
      </ToggleButton>
      <ToggleButton aria-label='Grid view' value='grid'>
        <GridViewOutlinedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default AppViewSwitcher
