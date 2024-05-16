import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pb: '80px'
  },
  grid: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(4, 270px)'
    },
    gap: '24px',
    mb: '30px'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center',
      mb: '32px'
    },
    title: {
      typography: { xs: 'h4' }
    },
    description: {
      typography: { xs: 'subtitle1' }
    }
  },
  button: {
    color: 'primary.900',
    padding: '16px 32px',
    backgroundColor: 'basic.grey',
    boxShadow: mainShadow,
    '&:hover': {
      color: 'basic.white'
    }
  }
}
