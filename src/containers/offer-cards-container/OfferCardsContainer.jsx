import { Grid } from '@mui/material'

const OfferCardsContainer = ({ offers, view }) => {
  return (
    <Grid container spacing={3}>
      {offers?.map((offer) => (
        <Grid
          item
          key={offer._id}
          lg={view === 'grid' ? 4 : 12}
          md={view === 'grid' ? 6 : 12}
          xs={12}
        >
          {/*TODO: use real offer card*/}
          {/*<OfferCard offer={offer} view={view}></OfferCard>*/}
        </Grid>
      ))}
    </Grid>
  )
}
export default OfferCardsContainer
