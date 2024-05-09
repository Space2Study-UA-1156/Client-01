export const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '30px'
  },

  title: {
    marginBottom: '30px'
  },

  titleWithDescription: {
    title: {
      typography: 'h5',
      my: '14px'
    },
    description: {
      typography: 'subtitle'
    }
  },

  buttonShowAllContainer: {
    alignSelf: 'flex-end',
    marginRight: '25px'
  },

  buttonShoWAllOffers: {
    background: 'transparent',
    color: 'primary.500'
  },

  inputContainer: {
    margin: '20px 20px',
    width: '100%'
  },

  inputField: {
    width: '100%',
    padding: '25px 25px'
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
    maxWidth: '100%',
    border: '3px solid red'
  }
}
