import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

import appTypography from '~/styles/app-theme/app.typography'
import { useTranslation } from 'react-i18next'
import CategoryList from '~/containers/category-list/CategoryList'

const PopularCategories = () => {
  const { t } = useTranslation()

  return (
    <Box component='section'>
      <Typography sx={appTypography.h4}>
        {t('common.popularCategories')}
      </Typography>
      <CategoryList />
    </Box>
  )
}
export default PopularCategories
