import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  root: {
    width: '400px',
    maxWidth: '100%',
    padding: '16px'
  },
  closeButton: {
    position: 'absolute',
    right: '8px',
    top: '8px'
  },
  closeIcon: {
    fontSize: '24px'
  },
  content: {
    padding: '16px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginTop: '16px'
  }
}
