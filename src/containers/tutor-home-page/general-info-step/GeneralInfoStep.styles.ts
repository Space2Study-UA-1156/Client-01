import { Theme, makeStyles } from '@mui/material/styles'

export const useGeneralInfoStepStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    minHeight: '100vh'
  },
  imageSection: {
    width: '100%'
  },
  formSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))
