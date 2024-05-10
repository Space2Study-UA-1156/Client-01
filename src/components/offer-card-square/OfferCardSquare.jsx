import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import StarIcon from '@mui/icons-material/Star'
import LanguageIcon from '@mui/icons-material/Language'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AppCard from '~/components/app-card/AppCard'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppChip from '~/components/app-chip/AppChip'
import useBreakpoints from '~/hooks/use-breakpoints'
import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/components/offer-card-square/OfferCardSquare.styles'

const OfferCardSquare = ({ offer }) => {
  const { t } = useTranslation()
  const { isMobile, isTablet } = useBreakpoints()

  const {
    price,
    title,
    languages,
    author,
    authorRole,
    _id,
    subject,
    proficiencyLevel,
    category
  } = offer

  const authorFullName = `${author.firstName} ${author.lastName}`
  const totalReviews = author.totalReviews[authorRole]
  const averageRating = author.averageRating[authorRole]
  const languagesList = languages.join(', ')

  const reviewAmount = t(
    `tutorProfilePage.reviews.${
      totalReviews === 1 ? 'reviewsCount_one' : 'reviewsCount_other'
    }`,
    { count: totalReviews }
  )
  const rating = Number.isInteger(averageRating)
    ? averageRating.toFixed(1)
    : averageRating

  const profilePath = createUrlPath(authRoutes.userProfile.path, author._id, {
    role: authorRole
  })
  const offerDefailPath = createUrlPath(authRoutes.offerDetails.path, _id)

  const levelChip =
    proficiencyLevel.length > 1
      ? `${proficiencyLevel.at(0)} - ${proficiencyLevel.at(-1)}`
      : proficiencyLevel.at(0)

  const offerDetails = [
    {
      label: t('common.labels.subject'),
      chip: subject.name,
      sx: styles.subjectChip(category.appearance.color),
      labelSx: styles.chip
    },
    {
      label: t('common.labels.level'),
      chip: levelChip,
      sx: styles.levelChip(category.appearance.color),
      labelSx: styles.chip
    }
  ].map((elem) => (
    <Box key={elem.label} sx={styles.detailsRow}>
      {!isMobile && !isTablet && (
        <Typography sx={styles.label}>{elem.label}</Typography>
      )}

      <AppChip labelSx={elem.labelSx} sx={elem.sx}>
        {elem.chip}
      </AppChip>
    </Box>
  ))

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
            <LanguageIcon sx={styles.langIcon} />

            {languagesList}
          </Typography>
        </Box>
      </Box>

      <Typography sx={styles.title}>{title}</Typography>

      <Divider sx={styles.divider} />

      <Box sx={styles.details}>{offerDetails}</Box>

      <Box sx={styles.overview}>
        <TitleWithDescription
          description={`/${t('common.hour')}`}
          style={styles.price}
          title={`${price} ${t('common.uah')}`}
        />

        <TitleWithDescription
          description={reviewAmount}
          style={styles.review}
          title={
            <>
              <StarIcon sx={styles.starIcon} />
              {rating}
            </>
          }
        />
      </Box>

      <Box sx={styles.buttons}>
        <AppButton component={Link} size='medium' to={offerDefailPath}>
          {t('common.labels.showDetails')}
        </AppButton>

        <AppButton size='medium' variant='tonal'>
          {t('common.labels.sendMessage')}
        </AppButton>
      </Box>

      <IconButton sx={styles.saveBtn}>
        <BookmarkBorderIcon />
      </IconButton>
    </AppCard>
  )
}

export default OfferCardSquare
