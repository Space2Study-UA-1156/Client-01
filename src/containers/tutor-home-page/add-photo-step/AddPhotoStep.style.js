import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'space-between' },
    gap: '77px',
    minHeight: { sm: '485px' },
    ...fadeAnimation
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    maxWidth: '432px'
  },
  photoPreview: {
    height: '100%',
    width: '100%',
    borderRadius: 'inherit',
    objectFit: 'cover',
    display: 'block'
  },
  dragAndDrop: {
    root: {
      width: { xs: '100%', md: '440px' }
    },
    uploadBox: {
      boxSizing: 'border-box',
      borderRadius: '20px',
      borderWidth: '2px',
      borderStyle: 'dashed',
      borderColor: 'primary.200',
      maxHeight: '440px',
      maxWidth: '440px',
      aspectRatio: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    activeDrag: {
      borderColor: 'basic.black'
    }
  }
}
