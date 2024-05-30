import { SxProps, Theme } from '@mui/material/styles'

export const styles: { [key: string]: SxProps<Theme> } = {
  root: {
    width: '650px',
    maxWidth: '100%',
    paddingTop: '45px',
    paddingRight: '52px',
    paddingBottom: '45px',
    paddingLeft: '52px'
  },
  closeButton: {
    position: 'absolute',
    right: '8px',
    top: '42px'
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
