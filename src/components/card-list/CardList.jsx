import Box from '@mui/material/Box'
import { styles as defaultStyles } from '~/components/card-list/CardList.styles'

const CardList = ({ cards, styles = defaultStyles }) => {
  return (
    <Box component='section' sx={styles.root}>
      <Box sx={styles.grid}>{cards}</Box>
    </Box>
  )
}

export default CardList
