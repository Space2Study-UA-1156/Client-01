export const styles = {
  card: {
    boxSizing: 'border-box',
    maxWidth: '360px',
    width: '100%',
    padding: { xs: '20px 30px', lg: '25px 32px' }
  },
  imgTitleDescription: {
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
    root: {
      display: 'flex',
      gap: '24px',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
  }
}
