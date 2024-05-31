import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const reviewService = {
  createReview: (reviewData) => {
    return axiosClient.post(URLs.reviews.create, reviewData)
  }
}
