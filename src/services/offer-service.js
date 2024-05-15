import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'

export const offerService = {
  getOffers: (params) => {
    return axiosClient.get(URLs.offers.get, { params })
  },
  getOfferById: (offerId) => {
    return axiosClient.get(createUrlPath(URLs.offers.get, offerId))
  },
  createOffer: (offerData) => {
    return axiosClient.post(URLs.offers.create, offerData)
  },
  updateOffer: (offerId, offerData) => {
    return axiosClient.patch(createUrlPath(URLs.offers.get, offerId), offerData)
  },
  deleteOffer: (offerId) => {
    return axiosClient.delete(createUrlPath(URLs.offers.get, offerId))
  }
}
