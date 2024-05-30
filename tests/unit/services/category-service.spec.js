import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { categoryService } from '~/services/category-service'
import { createUrlPath } from '~/utils/helper-functions'

const categoriesMock = [
  {
    _id: '1',
    name: 'music'
  },
  {
    _id: '2',
    name: 'history'
  },
  {
    _id: '3',
    name: 'design'
  }
]

const categoryNamesMock = ['music', 'history', 'design']

const offersMock = [
  { id: 1, title: 'Offer 1' },
  { id: 2, title: 'Offer 2' }
]

describe('categoryService tests', () => {
  it('should return categories', async () => {
    mockAxiosClient.onGet(URLs.categories.get).reply(200, categoriesMock)

    const result = await categoryService.getCategories()

    expect(result.data).toEqual(categoriesMock)
  })

  it('should return category names', async () => {
    mockAxiosClient
      .onGet(URLs.categories.getNames)
      .reply(200, categoryNamesMock)

    const result = await categoryService.getCategoriesNames()

    expect(result.data).toEqual(categoryNamesMock)
  })

  it('should return offers', async () => {
    const categoryId = '1'
    const subjectId = '2'
    const params = { sort: 'newest', search: 'test' }

    const categoryPath = createUrlPath(URLs.categories.get, categoryId)
    const subjectPath = createUrlPath(URLs.subjects.get, subjectId)
    const fullUrl = `${categoryPath}${subjectPath}/offers`

    mockAxiosClient.onGet(fullUrl, { params }).reply(200, offersMock)

    const result = await categoryService.getOffers({
      categoryId,
      subjectId,
      ...params
    })
    assert(() => {
      expect(result.data).toEqual(offersMock)
      expect(mockAxiosClient.history.get[0].url).toEqual(fullUrl)
      expect(mockAxiosClient.history.get[0].params).toEqual(params)
    })
  })
})
