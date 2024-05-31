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
  createOffer: async (offerData) => {
    try {
      const response = await axiosClient.post(URLs.offers.create, offerData)
      return response.data
    } catch (error) {
      console.error(
        'Error in createOffer service:',
        error.response ? error.response.data : error.message
      )
      throw error
    }
  },
  updateOffer: (offerId, offerData) => {
    return axiosClient.patch(createUrlPath(URLs.offers.get, offerId), offerData)
  },
  deleteOffer: (offerId) => {
    return axiosClient.delete(createUrlPath(URLs.offers.get, offerId))
  }
}
