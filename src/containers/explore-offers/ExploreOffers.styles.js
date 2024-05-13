import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '30px',
    maxWidth: '1128px',
    margin: '0 auto',
    border: '1px solid blue'
  },

  titleWithDescription: {
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

  buttonReturnToCategoriesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    mb: '10px'
  },

  buttonReturnToCategories: {
    fontSize: { xs: '12px', sm: '16px' },
    padding: { xs: '0 10px', sm: '12px 24px' },
    color: 'primary.500'
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
    mb: { xs: '20px', md: '30px' },
    border: '2px solid green'
  },

  inputContainer: {
    display: 'flex',
    width: '100%',
    gap: { sm: '10px', md: '20px' },
    border: '2px solid red'
  },

  inputField: {
    width: { xs: '100%', sm: 'max-content', md: '330px' },
    //width: '100%',
    flexGrow: { sm: 1, md: 0 },
    '& fieldset': { border: 'none' },
    input: {
      '&::placeholder': {
        color: 'primary.300',
        opacity: 1
      }
    },
    border: '2px solid pink'
  },

  categoryInput: {
    width: { xs: '100%', sm: '170px', md: '220px' },
    //width: '100%',
    '& fieldset': { borderColor: 'primary.200' },
    input: {
      '&::placeholder': {
        color: 'primary.500',
        opacity: 1
      }
    },
    border: '2px solid orange'
  },

  buttonSearch: {
    marginRight: { xs: '10px', sm: '20px', md: '25px' }
  }
}
