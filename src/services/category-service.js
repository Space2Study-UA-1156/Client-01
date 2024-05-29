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
  //===================Add===================

  /*getOffers: (categoryId, subjectId, search) => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    const subject = createUrlPath(URLs.subjects.get, subjectId)
    const searchQuery = search ? `?search=${encodeURIComponent(search) }` : ''
  
    return axiosClient.get(`${category}${subject}/offers${searchQuery}`)
  }
}*/

  getOffers: (categoryId, subjectId, params) => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    const subject = createUrlPath(URLs.subjects.get, subjectId)

    //const authorRoleQuery = authorRole ? `&authorRole=${encodeURIComponent(authorRole)}` : '&authorRole=student';
    //const searchQuery = search ? `?search=${encodeURIComponent(search)}` : ''
    //const sortQuery = sort ? `&sort=${encodeURIComponent(sort)}` : 'newest'

    //const fullUrl = `${category}${subject}/offers${searchQuery}${sortQuery}`

    //return axiosClient.get(fullUrl);
    //return axiosClient.get(`${category}${subject}/offers${searchQuery}${sortQuery}`)
    //return axiosClient.get(`${category}${subject}/offers${searchQuery}${sortQuery !== 'newest' ? '&' : ''}${sortQuery}`);

    ///const queryString = `${searchQuery}${sortQuery}`

    //const fullUrl = `${category}${subject}/offers${searchQuery ? '' : sortQuery ? '?' : ''}${queryString}`;
    //console.log('fullUrl:', )
    //return axiosClient.get(fullUrl)

    const fullUrl = `${category}${subject}/offers`
    return axiosClient.get(fullUrl, { params })
  }
}
