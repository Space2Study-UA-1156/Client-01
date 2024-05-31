import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'space-between' },
    gap: '77px',
    minHeight: { sm: '485px' },
    ...fadeAnimation
  },
  imageBox: {
    width: { md: '440px' },
    img: {
      margin: '0 auto',
      display: 'block',
      maxWidth: { xs: '180px', sm: '100%' }
    }
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '432px'
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '16px', sm: '20px' }
  }
}
