import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    width: { xs: '100%', lg: '949px' },
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  languageStepImage: {
    margin: '0 auto',
    maxWidth: { xs: '180px', md: '295px', lg: '378px' },
    maxHeight: { xs: '200px', md: '345px', lg: '440px' },
    objectFit: 'cover'
  },
  contentWrapper: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
}
