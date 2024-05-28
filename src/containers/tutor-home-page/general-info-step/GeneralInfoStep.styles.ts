import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'

export const useGeneralInfoStepStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    padding: 0
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '140px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      gap: '40px'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '20px'
    }
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    gap: '20px',
    width: '100%'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }
}))
