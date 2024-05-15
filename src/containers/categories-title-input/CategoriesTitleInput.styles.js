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
    margin: '0 auto'
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

  buttonShowAllContainer: {
    alignSelf: 'flex-end',
    marginRight: '25px',
    marginBottom: '15px'
  },

  buttonShowAllOffers: {
    fontSize: { xs: '12px', sm: '16px' },
    padding: { xs: '0 10px', sm: '12px 24px' },
    color: 'primary.500'
  },

  inputContainer: {
    padding: { xs: '5px', sm: '16px', md: '20px' },
    width: '100%',
    backgroundColor: 'basic.white',
    boxShadow: mainShadow,
    borderRadius: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    marginBottom: '20px'
  },

  inputField: {
    flexGrow: 1,
    padding: { xs: '5px', sm: '10px', md: '10px' },
    input: {
      '&::placeholder': {
        color: 'primary.300',
        fontSize: { xs: '14px', sm: '16px', md: '16px' },
        fontWeight: 400,
        opacity: 1
      }
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'transparent'
      },
      '&:hover fieldset': {
        borderColor: 'transparent'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'transparent'
      }
    },
    boxSizing: 'border-box'
  },

  buttonSearch: {
    marginRight: { xs: '5px', sm: '20px', md: '25px' },
    width: { xs: '10px', sm: '105px', md: '105px' }
  },

  footer: {
    variant: 'body2',
    color: 'primary.500',
    fontSize: '14px',
    fontWeight: 400
  },
  requestLink: {
    typography: 'body2',
    fontWeight: 500,
    textDecoration: 'underline',
    color: 'primary.700',
    fontSize: '14px'
  }
}
