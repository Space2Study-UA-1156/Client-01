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
    marginRight: '25px'
  },

  buttonShowAllOffers: {
    fontSize: { xs: '12px', sm: '16px' },
    padding: { xs: '0 10px', sm: '12px 24px' },
    color: 'primary.500'
  },

  inputContainer: {
    margin: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
    width: '100%',
    backgroundColor: 'basic.white',
    boxShadow: mainShadow,
    borderRadius: '70px'
  },

  inputField: {
    width: '100%',
    padding: '20px 20px',
    input: {
      '&::placeholder': {
        color: 'primary.300',
        fontSize: '16px',
        opacity: 1
      }
    }
  },

  buttonSearch: {
    marginRight: { xs: '10px', sm: '20px', md: '25px' }
  },

  cardsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    mb: '30px',
    maxWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  card: {
    maxWidth: '100%'
  }
}
