import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1128px',
    width: '100%',
    margin: '0 auto'
  },
  TitleWithDescription: {
    wrapper: {
      margin: '0 auto',
      mb: { xs: '20px', md: '30px' },
      textAlign: 'center'
    },
    title: {
      typography: 'h4',
      fontSize: { xs: '24px', md: '32px' }
    },
    description: {
      typography: 'body1',
      fontSize: { xs: '14px', md: '16px' },
      fontWeight: 400
    }
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    mb: '10px'
  },
  navigationBtn: {
    color: 'primary.500',
    fontSize: { xs: '12px', sm: '16px' },
    padding: { xs: '0 10px', sm: '12px 24px' }
  },
  searchContainer: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'basic.white',
    boxShadow: mainShadow,
    borderRadius: '70px',
    padding: { xs: '20px 14px', sm: '20px 30px', md: '30px 45px' },
    mb: { xs: '20px', md: '30px' }
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    gap: { sm: '30px', md: '50px' }
  },
  categoryInput: {
    width: { xs: '100%', sm: '170px', md: '220px' },
    '& fieldset': { borderColor: 'primary.200' },
    input: {
      '&::placeholder': {
        color: 'primary.500',
        opacity: 1
      }
    }
  },
  subjectInput: {
    width: { xs: '100%', sm: 'max-content', md: '330px' },
    flexGrow: { sm: 1, md: 0 },
    '& fieldset': { border: 'none' },
    input: {
      '&::placeholder': {
        color: 'primary.300',
        opacity: 1
      }
    }
  },
  footer: {
    typography: 'body2',
    color: 'primary.700'
  },
  requestLink: {
    typography: 'body2',
    fontWeight: 500,
    textDecoration: 'underline',
    color: 'primary.700'
  }
}
