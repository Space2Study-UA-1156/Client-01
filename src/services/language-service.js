import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const languageService = {
  getLanguages: () => {
    return axiosClient.get(URLs.languages.get)
  }
}
