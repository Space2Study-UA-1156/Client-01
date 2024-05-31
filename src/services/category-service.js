import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'

export const categoryService = {
  getCategories: (params) => {
    return axiosClient.get(URLs.categories.get, { params })
  },
  getCategoriesNames: () => {
    return axiosClient.get(URLs.categories.getNames)
  },
  getOffers: (data) => {
    const { categoryId, subjectId, ...params } = data
    const category = createUrlPath(URLs.categories.get, categoryId)
    const subject = createUrlPath(URLs.subjects.get, subjectId)
    const fullUrl = `${category}${subject}/offers`
    return axiosClient.get(fullUrl, { params })
  }
}
