export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '76px',
    p: { xs: '50px 16px', md: '70px 90px' }
  },
  formContainer: {
    maxWidth: '394px'
  },
  titleWithDescription: {
    wrapper: {
      mb: '20px'
    },
    title: {
      mb: { xs: '16px', md: '10px' },
      typography: { xs: 'h5', sm: 'h4' },
      color: 'primary.600'
    },
    description: {
      typography: 'body1',
      color: 'primary.700',
      mb: '20px'
    }
  }
}
