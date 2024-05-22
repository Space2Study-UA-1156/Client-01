export const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px'
  },
  grid: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: {
      xs: '1fr',
      md: 'repeat(2, 1fr)',
      lg: 'repeat(3, 360px)'
    },
    gap: '24px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
}
