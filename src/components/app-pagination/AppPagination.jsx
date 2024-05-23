import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import { styles } from '~/components/app-pagination/AppPagination.styles'

const AppPagination = ({ pageCount, page, sx, ...props }) => {
  if (pageCount > 1) {
    return (
      <Box data-testid='app-pagination' sx={{ ...styles.wrapper, ...sx }}>
        <Pagination count={pageCount} defaultPage={1} page={page} {...props} />
      </Box>
    )
  }
  return null
}
export default AppPagination
