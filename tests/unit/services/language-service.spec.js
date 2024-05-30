import { URLs } from '~/constants/request'
import { mockAxiosClient } from '~tests/test-utils'
import { languageService } from '~/services/language-service'

const languagesDataMock = [
  'English',
  'Ukrainian',
  'Polish',
  'German',
  'French',
  'Spanish',
  'Arabic'
]

describe('languageService test', () => {
  it('should return languages', async () => {
    mockAxiosClient.onGet(URLs.languages.get).reply(200, languagesDataMock)

    const result = await languageService.getLanguages()

    expect(result.data).toEqual(languagesDataMock)
  })
})
