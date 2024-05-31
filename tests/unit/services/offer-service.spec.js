import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { offerService } from '~/services/offer-service'

const offersMock = [
  {
    _id: '1',
    price: 500,
    title: 'title 1'
  },
  {
    _id: '2',
    price: 600,
    title: 'title 2'
  },
  {
    _id: '3',
    price: 700,
    title: 'title 3'
  },
  {
    _id: '4',
    price: 800,
    title: 'title 4'
  }
]

describe.skip('offerService tests', () => {
  it('should return offers', async () => {
    mockAxiosClient.onGet(URLs.offers.get).reply(200, offersMock)

    const result = await offerService.getOffers()

    expect(result.data).toEqual(offersMock)
  })

  it('should return offer by id', async () => {
    const offerId = '3'
    const offerByIdMock = offersMock.filter(({ _id }) => _id === offerId)
    mockAxiosClient
      .onGet(`${URLs.offers.get}/${offerId}`)
      .reply(200, offerByIdMock)

    const result = await offerService.getOfferById(offerId)

    expect(result.data).toEqual(offerByIdMock)
  })

  it('should create offer', async () => {
    const offerData = {
      _id: '5',
      price: 800,
      title: 'new offer'
    }
    mockAxiosClient.onPost(URLs.offers.create).reply(201, offerData)

    const result = await offerService.createOffer(offerData)

    expect(result.data).toEqual(offerData)
  })

  it('should update offer', async () => {
    const offerId = '2'
    const updatedOfferData = {
      title: 'updated title for test offer'
    }
    mockAxiosClient
      .onPatch(`${URLs.offers.get}/${offerId}`)
      .reply(200, updatedOfferData)

    const result = await offerService.updateOffer(offerId, updatedOfferData)

    expect(result.data).toEqual(updatedOfferData)
  })

  it('should delete offer', async () => {
    const offerId = '4'
    mockAxiosClient.onDelete(`${URLs.offers.get}/${offerId}`).reply(204)

    const result = await offerService.deleteOffer(offerId)

    expect(result.status).toEqual(204)
  })
})
