export const styles = {
  card: {
    boxSizing: 'border-box',
    width: '100%',
    padding: { xs: '20px 30px', lg: '25px 32px' },
    display: 'flex',
    gap: '24px',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleWithDescription: {
    title: {
      fontSize: '20px',
      color: 'primary.900',
      typography: 'h6',
      mb: '4px'
    },
    description: {
      fontSize: '14px',
      color: 'primary.500',
      typography: 'subtitle2',
      fontWeight: 400
    }
  },
  iconContainer: {
    width: '62px',
    height: '62px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: '32px',
    height: '32px'
  }
}
