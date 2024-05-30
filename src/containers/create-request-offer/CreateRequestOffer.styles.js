export const styles = {
  main: {
    margin: '0 auto',
    width: '100%',
    marginBottom: '40px'
  },

  root: {
    backgroundColor: 'companyBlue',
    borderRadius: '16px',
    padding: { xs: '20px', sm: '40px 24px', md: '60px 50px' }
  },
  row: {
    display: 'flex',
    justifyContent: { sm: 'space-between' },
    flexDirection: { xs: 'column', sm: 'row' },
    gap: '20px'
  },
  titleWithDescription: {
    title: {
      typography: { xs: 'h6', md: 'h4' },
      fontSize: { sm: '24px' },
      lineHeight: { sm: '33px' },
      marginBottom: { xs: '8px', sm: '14px' }
    },
    description: {
      typography: { xs: 'body2', sm: 'body1' }
    },
    wrapper: {
      maxWidth: '597px'
    }
  },
  button: {
    width: { xs: '100%', sm: 'auto' },
    marginTop: { xs: '14px', sm: '20px' }
  }
}
