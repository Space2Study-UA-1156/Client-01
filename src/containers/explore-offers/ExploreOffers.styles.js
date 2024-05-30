// ====================new==============
import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  rootInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: '1128px',
    marginBottom: '30px',
    width: '100%',
    margin: '0 auto'
  },

  titleWithDescription: {
    title: {
      typography: { xs: 'h5', md: 'h4' },
      fontSize: { xs: '24px', md: '32px' }
    },
    description: {
      typography: { xs: 'body2', md: 'body1' },
      fontSize: { xs: '14px', md: '16px' },
      width: '100%'
    }
  },

  buttonsNavigationContainer: {
    marginRight: { xs: '0px', md: '25px' },
    marginBottom: '15px',
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },

  buttonsNavigation: {
    fontSize: { xs: '12px', sm: '16px' },
    padding: { xs: '0 10px', sm: '12px 24px' },
    color: 'primary.500'
  },

  searchContainer: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', sm: 'row', md: 'row' },
    width: '100%',
    backgroundColor: 'basic.white',
    boxShadow: mainShadow,
    borderRadius: { xs: '0px', sm: '50px', md: '70px' },
    gap: { xs: '10px' },
    padding: { xs: '20px 14px', sm: '20px 30px', md: '30px 45px' },
    mb: { xs: '20px', md: '30px' }
  },

  autocompleteInput: {
    width: { xs: '100%', sm: '100%', md: '220px' },
    height: { xs: '48px', sm: '48px' },
    '& fieldset': { borderColor: 'primary.200' },
    input: {
      '&::placeholder': {
        color: 'primary.500',
        opacity: 1
      }
    }
  },

  inputTutor: {
    width: { md: '330px' },
    flexGrow: { md: 0 },
    '& fieldset': { border: 'none' },
    input: {
      '&::placeholder': {
        color: 'primary.300',
        fontSize: '16px',
        fontWeight: 400,
        opacity: 1
      }
    }
  }
}
