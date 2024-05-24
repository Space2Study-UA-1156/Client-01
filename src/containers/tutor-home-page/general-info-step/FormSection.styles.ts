import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'

export const useFormSectionStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    width: '100%',
    minWidth: '435px',
    minHeight: '430px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  topFormText: {
    marginBottom: '20px'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '435px'
  },
  contentBox: {
    width: '100%',
    maxWidth: '435px',
    maxHeight: '415px'
  }
}))
