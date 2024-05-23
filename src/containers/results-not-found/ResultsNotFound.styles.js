export const styles = {
  root: {
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    padding: { xs: '32px 25px', md: '124px 25px' }
  },
  box: {
    textAlign: 'center',
    maxWidth: '488px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: '24px', md: '36px' }
  },
  content: {
    root: {
      margin: '0'
    },
    img: {
      marginBottom: { xs: '16px' }
    },
    titleWithDescription: {
      title: {
        typography: 'h5',
        color: 'primary.900',
        marginBottom: { xs: '21px', md: '7px' }
      },
      description: {
        color: 'primary.500',
        typography: 'body1'
      }
    }
  }
}
