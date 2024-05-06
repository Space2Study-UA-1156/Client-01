import { Box, IconButton } from '@mui/material'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppButton from '~/components/app-button/AppButton'
import imgSuccess from '~/assets/img/email-confirmation-modals/success-icon.svg'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { useModalContext } from '~/context/modal-context'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/email-confirm-popup-window/EmailConfirmPopupWindow.styles'

const EmailConfirmPopupWindow = () => {
  const { t } = useTranslation()
  const { closeModal, openModal } = useModalContext()

  const handleClose = () => {
    closeModal()
  }

  const openLoginDialog = () => {
    openModal({ component: <LoginDialog /> })
  }

  return (
    <Box data-testid='modal-root' sx={styles.box}>
      <IconButton
        aria-label='Close'
        onClick={handleClose}
        sx={styles.closeButton}
      />
      <ImgTitleDescription
        alt='Success Icon'
        img={imgSuccess}
        style={styles}
        title={t('modals.emailConfirm')}
      />
      <AppButton
        data-testid='go-to-login-button'
        onClick={openLoginDialog}
        size={'large'}
        sx={styles.button}
        type='submit'
        variant='contained'
      >
        {t('button.goToLogin')}
      </AppButton>
    </Box>
  )
}

export default EmailConfirmPopupWindow
