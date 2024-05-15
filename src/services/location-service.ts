import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'

export const LocationService = {
  getCountries: (): Promise<AxiosResponse<string[]>> => {
    return axiosClient.get<string[]>(URLs.location.getCountries)
  },
  getCities: (country: string): Promise<AxiosResponse<string[]>> => {
    return axiosClient.get<string[]>(
      createUrlPath(URLs.location.getCities, country)
    )
  }
}
