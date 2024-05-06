export const styles = {
  box: {
    m: { xs: '0 05vw', sm: '0 10vw', md: '0 25vw' },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  button: {
    size: 'large',
    mt: '32px',
    color: 'primary.900',
    backgroundColor: 'primary.50',
    '&:hover': {
      color: 'basic.white'
    }
  },
  titleWithDescription: {
    title: {
      typography: 'h5',
      color: 'primary.900',
      my: '14px'
    },
    description: {
      color: 'primary.500',
      typography: 'subtitle'
    }
  }
}
