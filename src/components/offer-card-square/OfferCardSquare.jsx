import { useTranslation } from 'react-i18next'
import { authRoutes } from '~/router/constants/authRoutes'
import { Link } from 'react-router-dom'

import LanguageIcon from '@mui/icons-material/Language'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AppCard from '~/components/app-card/AppCard'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { createUrlPath } from '~/utils/helper-functions'
import { styles } from '~/components/offer-card-square/OfferCardSquare.styles'

const OfferCardSquare = ({ offer }) => {
  const { t } = useTranslation()

  const { price, title, languages, author, authorRole, _id } = offer

  const authorFullName = `${author.firstName} ${author.lastName}`

  const profilePath = createUrlPath(authRoutes.userProfile.path, author._id, {
    role: authorRole
  })
  const offerDefailPath = createUrlPath(authRoutes.offerDetails.path, _id)

  return (
    <AppCard sx={styles.appCard}>
      <Box sx={styles.row}>
        <Link to={profilePath}>
          <Avatar src={author.photo} sx={styles.avatar} />
        </Link>

        <Box sx={styles.rightBox}>
          <Typography component={Link} sx={styles.name} to={profilePath}>
            {authorFullName}
          </Typography>

          <Typography sx={styles.languages}>
            <LanguageIcon sx={styles.icon} />

            {languages.join(', ')}
          </Typography>
        </Box>
      </Box>

      <Typography sx={styles.title}>{title}</Typography>

      <Divider sx={styles.divider} />

      <Box sx={styles.overview}>
        <TitleWithDescription
          description={`/${t('common.hour')}`}
          style={styles.price}
          title={`${price} ${t('common.uah')}`}
        />
      </Box>

      <Box sx={styles.buttons}>
        <AppButton component={Link} size='medium' to={offerDefailPath}>
          {t('common.labels.viewDetails')}
        </AppButton>

        <AppButton size='medium' variant='tonal'>
          {t('common.labels.sendMessage')}
        </AppButton>
      </Box>
    </AppCard>
  )
}

export default OfferCardSquare
