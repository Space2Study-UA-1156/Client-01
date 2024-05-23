import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Avatar from '@mui/material/Avatar'
import NavigationIcon from '~/components/navigation-icon/NavigationIcon'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import { useCallback, useEffect } from 'react'

const AccountIcon = ({ buttonProps }) => {
  const { t } = useTranslation()
  const { userId, userRole, isUserUpdated } = useSelector(
    (state) => state.appMain
  )

  const serviceFunction = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const { response, fetchData, loading } = useAxios({
    service: serviceFunction
  })

  useEffect(() => {
    if (isUserUpdated) {
      fetchData()
    }
  }, [isUserUpdated, fetchData])

  const initials = `${response?.firstName.at(0)}${response?.lastName.at(0)}`

  return (
    <NavigationIcon
      buttonProps={buttonProps}
      icon={
        <Avatar alt={initials} data-testid='AccountIcon' src={response?.photo}>
          {!loading && initials}
        </Avatar>
      }
      tooltip={t('iconsTooltip.account')}
    />
  )
}

export default AccountIcon
