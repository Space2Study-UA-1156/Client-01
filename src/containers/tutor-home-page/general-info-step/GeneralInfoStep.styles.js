import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '115px'
  },
  imageContainer: {
    width: '380px'
  },
  formContainer: {
    width: '450px',
    borderRadius: 0,
    boxShadow: 'none',
    height: '100%'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '20px'
  },
  fullWidthInput: {
    width: '100%'
  },
  halfWidthInput: {
    width: '100%'
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '380px'
  },
  formItem: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    width: '380px'
  }
}))
export default useStyles
