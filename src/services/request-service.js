import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'

export const requestService = {
  createRequest: (requestData) => {
    return axiosClient.post(URLs.requests.create, requestData)
  }
}
