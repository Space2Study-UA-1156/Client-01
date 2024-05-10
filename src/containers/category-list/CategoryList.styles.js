import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  grid: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(3, 360px)'
    },
    gap: '24px',
    mb: '30px'
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
