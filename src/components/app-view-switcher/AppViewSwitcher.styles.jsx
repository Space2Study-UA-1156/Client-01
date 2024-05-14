import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup'

export const styles = {
  buttonGroup: {
    display: 'flex',
    gap: '10px',

    [`& .${toggleButtonGroupClasses.grouped}`]: {
      color: 'primary.900',
      border: '1px solid',
      borderColor: 'primary.200',
      borderRadius: '4px',

      '&.Mui-selected': {
        backgroundColor: 'inherit',
        borderColor: 'primary.900'
      }
    }
  }
}
