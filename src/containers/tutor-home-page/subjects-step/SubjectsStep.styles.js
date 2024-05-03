import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  imageBox: {
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
