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
  }
}
