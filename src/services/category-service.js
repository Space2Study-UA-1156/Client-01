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

  /*getOffers: (categoryId, subjectId, params) => {
    const fullUrl = createUrlPath(URLs.categories.get, categoryId, subjectId);
    console.log('Full URL:', fullUrl)
    console.log('Params:', params); 
    return axiosClient.get(fullUrl, { params: params });
}*/

  getOffers: (categoryId, subjectId, params) => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    const subject = createUrlPath(URLs.subjects.get, subjectId)

    const fullUrl = `${category}${subject}/offers`
    console.log('Full URL:', fullUrl)
    console.log('Full URL Subject:', subject)
    console.log('Full URL SubjectId:', subjectId)
    console.log('Params:', params)
    return axiosClient.get(fullUrl, { params: params })
  }

  /*getOffers: (categoryId, subjectId, search) => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    const subject = createUrlPath(URLs.subjects.get, subjectId)
    const searchQuery = search ? `?search=${encodeURIComponent(search) }` : ''
  
    return axiosClient.get(`${category}${subject}/offers${searchQuery}`)
  }*/

  /*getOffers: (categoryId, subjectId, params) => {
    const fullUrl = createUrlPath(
      URLs.categories.get,
      `${categoryId}/subjects/${subjectId}/offers`,
      params
    );
    console.log('Full URL:', fullUrl);
    console.log('Params:', params); 
    return axiosClient.get(fullUrl);
  }
}*/
  // ==============old version=========
  /*getOffers: (categoryId, subjectId) => {
  const category = createUrlPath(URLs.categories.get, categoryId)
  const subject = createUrlPath(URLs.subjects.get, subjectId)
  return axiosClient.get(`${category}${subject}/offers`)
}*/
}
