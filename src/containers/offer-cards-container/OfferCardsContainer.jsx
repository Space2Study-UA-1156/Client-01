import { Box } from '@mui/material'
import OfferCardList from '~/components/offer-card-list/OfferCardList'
import OfferCardSquare from '~/components/offer-card-square/OfferCardSquare'
import { styles } from '~/containers/offer-cards-container/OfferCardsContainer.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

const OfferCardsContainer = ({ offers, view }) => {
  const { isMobile } = useBreakpoints()

  return (
    <Box component='section' sx={styles.wrapper}>
      <Box sx={view === 'list' ? styles.list : styles.grid}>
        {offers?.map((offer) => (
          <Box key={offer._id}>
            {view === 'list' ? (
              <>
                {isMobile ? (
                  <OfferCardSquare offer={offer} />
                ) : (
                  <OfferCardList offer={offer} />
                )}
              </>
            ) : (
              <OfferCardSquare offer={offer} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
export default OfferCardsContainer
