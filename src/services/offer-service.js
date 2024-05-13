import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'

export const offerService = {
  getOffers: (params) => {
    return axiosClient.get(URLs.offers.get, { params })
  }
}
