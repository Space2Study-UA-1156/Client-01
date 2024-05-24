import { makeStyles } from '@mui/styles'
export const useTextFieldGroupStyles = makeStyles(() => ({
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  halfWidthInput: {
    width: 'calc(50% - 8px)'
  },
  fullWidthInput: {
    width: '100%',
    margin: '14px 0'
  }
}))
