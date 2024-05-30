import { makeStyles } from '@mui/styles'

export const userOfferFormStyles = makeStyles(() => ({
  drawerContainer: {
    paddingBottom: '190px'
  },
  drawerHeaderWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '30px'
  },
  drawerIcon: {
    position: 'relative',
    bottom: '3px'
  },
  drawerHeader: {
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '36px',
    color: '#455a64'
  },
  drawerDesc: {
    color: '#455A64',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    marginBottom: '40px'
  },
  numberBox: {
    border: '2px solid #455a64',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 800,
    color: '#455A64'
  },
  drawerSubtitle: {
    color: '#455A64',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '28px',
    position: 'relative',
    top: '4px'
  },
  desc: {
    color: '#455a64',
    fontSize: '16px',
    marginTop: '15px',
    marginBottom: '15px'
  },
  checkboxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    fontSize: '14px',
    fontWeight: 400,
    color: '#455A64',
    marginBottom: '35px'
  }
}))
