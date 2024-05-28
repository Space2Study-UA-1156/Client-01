import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  rootInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '30px',
    maxWidth: '1128px',
    margin: '0 auto'
  },

  title: {
    width: '100%',
    marginTop: '20px'
  },

  titleWithDescription: {
    gap: '7px',
    title: {
      typography: { xs: 'h5', md: 'h4' },
      fontSize: { xs: '24px', md: '32px' },
      width: '100%'
    },
    description: {
      typography: { xs: 'body2', md: 'body1' },
      fontSize: { xs: '14px', md: '16px' },
      width: '100%'
    }
  },

  buttonShowAllContainer: {
    marginRight: { xs: '0px', md: '25px' },
    marginBottom: '15px',
    marginTop: '15px',
    alignSelf: 'flex-end'
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
    borderRadius: { xs: '30px', sm: '60px', md: '70px' },
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
    width: { xs: '32px', sm: '105px', md: '105px' },
    height: { xs: '32px', sm: '48px', md: '48px' },
    padding: { xs: '0', sm: '7px 24px', md: '7px 24 px' },
    minWidth: 'unset'
  },

  footer: {
    variant: 'body2',
    color: 'primary.500',
    fontSize: '14px',
    fontWeight: 400,
    marginBottom: '20px'
  },

  requestLink: {
    typography: 'body2',
    fontWeight: 500,
    textDecoration: 'underline',
    color: 'primary.700',
    fontSize: '14px'
  }
}
