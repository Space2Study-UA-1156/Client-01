import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Rating } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import Avatar from '@mui/material/Avatar'
import StarIcon from '@mui/icons-material/Star'
import useBreakpoints from '~/hooks/use-breakpoints'
import { createUrlPath } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import AppChip from '~/components/app-chip/AppChip'
import AppCard from '~/components/app-card/AppCard'
import { styles } from '~/components/offer-card-list/OfferCardList.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import useReview from '~/hooks/use-review'

const OfferCardList = ({ offer }) => {
  const { t } = useTranslation()
  const { isMobile, isTablet, isLaptopAndAbove } = useBreakpoints()

  const {
    price,
    title,
    languages,
    author,
    authorRole,
    _id,
    subject,
    proficiencyLevel,
    category,
    description
  } = offer

  const { rating, reviewAmount, handleRatingChange } = useReview(
    author,
    authorRole,
    _id
  )

  const authorFullName = `${author.firstName} ${author.lastName}`
  const authorFullNameLaptop = `${author.firstName} ${author.lastName[0]}.`
  const languagesList = languages.join(', ')

  const reviewText = `tutorProfilePage.reviews.${
    reviewAmount === 1 ? 'reviewsCount_one' : 'reviewsCount_other'
  }`

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
      sx: styles.subjectChip(category.appearance.color)
    },
    {
      label: t('common.labels.level'),
      chip: levelChip,
      sx: styles.levelChip(category.appearance.color)
    }
  ].map((elem) => (
    <Box key={elem.label} sx={styles.detailsRow}>
      <AppChip labelSx={styles.chip} sx={elem.sx}>
        {elem.chip}
      </AppChip>
    </Box>
  ))

  return (
    <AppCard sx={styles.appCard}>
      <Box sx={styles.leftWrapper}>
        <Box sx={styles.leftBox}>
          <Avatar
            component={Link}
            src={author.photo}
            sx={styles.avatar}
            to={profilePath}
          />
          {isLaptopAndAbove && (
            <Typography component={Link} sx={styles.name} to={profilePath}>
              {authorFullNameLaptop}
            </Typography>
          )}
          <TitleWithDescription
            description={t(reviewText, { count: reviewAmount })}
            style={styles.review}
            title={
              <Rating
                emptyIcon={
                  <StarIcon fontSize='inherit' style={styles.starIcon} />
                }
                onChange={(_e, value) => handleRatingChange(value)}
                precision={0.5}
                size='small'
                sx={styles.rating}
                value={parseFloat(rating)}
              />
            }
          />
        </Box>

        <Box sx={styles.centerBox}>
          {(isTablet || isMobile) && (
            <Typography component={Link} sx={styles.name} to={profilePath}>
              {authorFullName}
            </Typography>
          )}
          <Typography sx={styles.title}>{title}</Typography>
          <Box sx={styles.details}>{offerDetails}</Box>
          <Typography sx={styles.description}>{description}</Typography>
          <Typography sx={styles.languages}>
            <LanguageIcon sx={styles.langIcon} />
            {languagesList}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.rightBox}>
        <Box sx={styles.overview}>
          <TitleWithDescription
            description={`/${t('common.hour')}`}
            style={styles.price}
            title={`${price} ${t('common.uah')}`}
          />
          <BookmarkBorderIcon />
        </Box>
        <Box sx={styles.buttons}>
          <Link to={offerDefailPath}>
            <AppButton size='medium' sx={styles.actionButton}>
              {t('common.labels.showDetails')}
            </AppButton>
          </Link>
          <AppButton size='medium' sx={styles.actionButton} variant='tonal'>
            {t('common.labels.sendMessage')}
          </AppButton>
        </Box>
      </Box>
    </AppCard>
  )
}
export default OfferCardList
