import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'

export const useFormSectionStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    width: '100%',
    maxWidth: '435px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  topFormText: {
    marginBottom: '30px'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  contentBox: {
    width: '100%',
    maxWidth: '435px',
    maxHeight: '415px'
  }
}))
