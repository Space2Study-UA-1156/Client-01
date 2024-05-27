export const styles = {
  cardList: {
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
      gap: '24px'
    }
  },
  button: {
    display: 'block',
    margin: '30px auto 0'
  },
  notFoundContainer: {
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    padding: { xs: '32px 25px', md: '112px 25px' }
  }
}
