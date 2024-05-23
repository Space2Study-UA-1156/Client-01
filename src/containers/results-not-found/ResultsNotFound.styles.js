export const styles = {
  root: {
    bgcolor: 'basic.white',
    borderRadius: '6px',
    p: '25px',
    py: { xs: '32px', md: '124px' },
    mx: { xs: '-16px', sm: '-24px', md: 0 }
  },
  box: {
    textAlign: 'center',
    maxWidth: '488px',
    m: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: '24px', md: '36px' }
  },
  content: {
    root: {
      m: '0'
    },
    img: {
      mb: { xs: '16px' }
    },
    titleWithDescription: {
      title: {
        typography: 'h5',
        color: 'primary.900',
        mb: { xs: '21px', md: '7px' }
      },
      description: {
        color: 'primary.500',
        typography: 'body1'
      }
    }
  }
}
