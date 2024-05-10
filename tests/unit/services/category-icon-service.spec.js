import { vi } from 'vitest'
import { getCategoryIcon } from '~/services/category-icon-service'

vi.mock('@mui/icons-material/Language', () => ({
  default: 'LanguageIcon'
}))

vi.mock('@mui/icons-material/ColorLens', () => ({
  default: 'ColorLensIcon'
}))

vi.mock('@mui/icons-material/Biotech', () => ({
  default: 'BiotechIcon'
}))

vi.mock('@mui/icons-material/DesktopMacOutlined', () => ({
  default: 'DesktopMacIcon'
}))

vi.mock('@mui/icons-material/Tag', () => ({
  default: 'TagIcon'
}))

vi.mock('@mui/icons-material/AccountBalance', () => ({
  default: 'AccountBalanceIcon'
}))

vi.mock('@mui/icons-material/Star', () => ({
  default: 'StarIcon'
}))

vi.mock('@mui/icons-material/DesignServices', () => ({
  default: 'DesignServicesIcon'
}))

vi.mock('@mui/icons-material/MusicNote', () => ({
  default: 'MusicNoteIcon'
}))

vi.mock('@mui/icons-material/Science', () => ({
  default: 'ScienceIcon'
}))

vi.mock('@mui/icons-material/LegendToggle', () => ({
  default: 'LegendToggleIcon'
}))

const iconNames = [
  'LanguageIcon',
  'ColorLensIcon',
  'BiotechIcon',
  'DesktopMacIcon',
  'TagIcon',
  'AccountBalanceIcon',
  'StarIcon',
  'DesignServicesIcon',
  'MusicNoteIcon',
  'ScienceIcon',
  'LegendToggleIcon'
]

describe('categoryIconService test', () => {
  it('should return language icon', () => {
    iconNames.forEach((iconName) => {
      const icon = getCategoryIcon(iconName)
      expect(icon).toEqual(iconName)
    })
  })

  it('should return LanguageIcon', () => {
    const icon = getCategoryIcon('InvalidIcon')
    expect(icon).toEqual('LanguageIcon')
  })
})
