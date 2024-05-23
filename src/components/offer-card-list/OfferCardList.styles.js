import { ellipsisTextStyle } from '~/utils/helper-functions'
import { alpha } from '@mui/material/styles'

export const styles = {
  appCard: {
    display: 'flex',
    padding: '31px 20px',
    flexDirection: 'row',
    maxWidth: '1088px',
    gap: { xs: '20px', md: '50px' },
    justifyContent: 'space-between'
  },
  leftBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  centerBox: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '680px',
    gap: '10px'
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    gap: '30px'
  },
  leftWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: { xs: '20px', md: '50px' }
  },
  avatar: {
    width: { xs: '72px', md: '100px' },
    height: { xs: '72px', md: '100px' },
    marginBottom: '16px'
  },
  name: {
    textDecoration: 'none',
    color: { xs: '#263238', md: 'primary.500' },
    fontWeight: 500,
    display: 'inline-block',
    typography: { xs: 'h6' }
  },
  review: {
    wrapper: {
      textAlign: 'left'
    },
    title: {
      display: 'inline-flex',
      alignItems: 'center',
      typography: { xs: 'body1', md: 'h6' },
      marginBottom: '4px'
    },
    description: {
      typography: 'caption',
      display: 'block',
      color: 'primary.500'
    }
  },
  starIcon: {
    color: 'basic.yellow'
  },
  title: {
    typography: { xs: 'body1', md: 'midTitle' },
    fontWeight: { xs: 500, md: 600 },
    color: 'primary.700',
    ...ellipsisTextStyle(2)
  },
  chip: {
    typography: 'overline',
    fontWeight: 'inherit'
  },
  label: {
    typography: 'overline',
    display: 'block',
    color: 'primary.500',
    minWidth: '58px'
  },
  detailsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  subjectChip: (color) => ({
    backgroundColor: alpha(color, 0.6),
    fontWeight: '500'
  }),
  levelChip: (color) => ({
    backgroundColor: alpha(color, 0.2),
    fontWeight: '400'
  }),
  details: {
    display: 'flex',
    flexDirection: 'row',
    gap: '4px'
  },
  description: {
    color: 'primary.600',
    typography: 'body2',
    ...ellipsisTextStyle(5)
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
  overview: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: { xs: '10px', md: '16px' }
  },
  price: {
    title: {
      typography: 'h6'
    },
    description: {
      typography: 'overline',
      display: 'block',
      color: 'primary.500'
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  actionButton: {
    width: '100%',
    height: '48px'
  },
  rating: {
    backgroundColor: 'basic.grey',
    borderRadius: '4px',
    padding: '3.5px',
    gap: '3.5px'
  }
}
