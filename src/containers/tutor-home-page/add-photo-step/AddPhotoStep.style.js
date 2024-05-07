import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'space-between' },
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },
  contentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingBottom: { xs: '20px' }
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: '0 1 432px',
    flexShrink: { md: 0 }
  },
  photoContainer: {
    height: { xs: '270px', md: 'fit-content' },
    borderRadius: '20px',
    maxHeight: '440px',
    maxWidth: '440px',
    width: '100%',
    boxSizing: 'border-box',
    aspectRatio: { md: 1 }
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
      width: '100%'
    },
    uploadBox: {
      boxSizing: 'border-box',
      borderRadius: '20px',
      border: '2px dashed rgb(2, 2, 2, 0.5)',
      height: { xs: '270px', md: 'auto' },
      maxHeight: '440px',
      aspectRatio: { md: 1 },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    activeDrag: {
      borderColor: 'basic.black'
    }
  }
}
