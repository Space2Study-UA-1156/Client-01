import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'

export const useGeneralInfoStepStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '115px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    gap: '200px',
    width: '100%'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }
}))
