import { ellipsisTextStyle } from '~/utils/helper-functions'

export const styles = {
  appCard: {
    padding: '24px 20px',
    width: '100%',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '14px', md: '20px' },
    marginBottom: { xs: '14px', md: '16px' }
  },
  rightBox: {
    paddingRight: '15px'
  },
  avatar: {
    width: { xs: '72px', md: '100px' },
    height: { xs: '72px', md: '100px' }
  },
  name: {
    textDecoration: 'none',
    color: 'primary.500',
    fontWeight: 500,
    marginBottom: { xs: '4px', md: '10px' },
    display: 'inline-block'
  },
  icon: {
    width: '20px',
    height: '20px'
  },
  languages: {
    typography: 'body2',
    color: 'primary.400',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  title: {
    typography: { xs: 'subtitle1', md: 'midTitle' },
    fontWeight: { xs: 500, md: 600 },
    color: 'primary.700',
    marginBottom: { xs: '10px', md: '16px' },
    ...ellipsisTextStyle(2)
  },
  divider: {
    marginBottom: { xs: '10px', md: '16px' }
  },
  offerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: { xs: '18px', md: '24px' }
  },
  label: {
    typography: 'overline'
  },
  overview: {
    marginBottom: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: { xs: '10px', md: '16px' }
  },
  price: {
    title: {
      typography: 'h6'
    },
    description: {
      display: 'block',
      typography: 'overline',
      color: 'primary.500'
    }
  },
  review: {
    title: {
      typography: 'h6',
      alignItems: 'center',
      display: 'flex'
    },
    description: {
      display: 'block',
      typography: 'overline',
      color: 'primary.500'
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '10px', md: '16px' }
  }
}
