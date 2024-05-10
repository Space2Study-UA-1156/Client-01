import { alpha } from '@mui/material/styles'
import { ellipsisTextStyle } from '~/utils/helper-functions'

export const styles = {
  appCard: {
    padding: '24px 20px',
    flexDirection: 'column',
    boxSizing: 'border-box',
    position: 'relative',
    maxWidth: '360px'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '14px', md: '20px' },
    marginBottom: { xs: '14px', md: '16px' }
  },
  rightBox: {
    paddingRight: '25px'
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
  langIcon: {
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
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: { xs: '18px', md: '24px' }
  },
  detailsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  label: {
    typography: 'overline',
    display: 'block',
    color: 'primary.500',
    minWidth: '58px'
  },
  subjectChip: (color) => ({
    backgroundColor: alpha(color, 0.6)
  }),
  levelChip: (color) => ({
    backgroundColor: alpha(color, 0.2)
  }),
  chip: {
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
      typography: { xs: 'body1', md: 'h6' }
    },
    description: {
      typography: 'overline',
      display: 'block',
      color: 'primary.500'
    }
  },
  review: {
    wrapper: {
      textAlign: 'right'
    },
    title: {
      display: 'inline-flex',
      alignItems: 'center',
      typography: { xs: 'body1', md: 'h6' }
    },
    description: {
      typography: 'overline',
      display: 'block',
      color: 'primary.500'
    }
  },
  starIcon: {
    color: 'basic.yellow',
    width: { xs: '16px', md: '20px' },
    height: { xs: '16px', md: '20px' }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '10px', md: '16px' }
  },
  saveBtn: {
    position: 'absolute',
    right: '12px',
    top: '16px',
    color: 'primary.900'
  }
}
