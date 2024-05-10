import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import BiotechIcon from '@mui/icons-material/Biotech'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined'
import LanguageIcon from '@mui/icons-material/Language'
import LegendToggleIcon from '@mui/icons-material/LegendToggle'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import ScienceIcon from '@mui/icons-material/Science'
import StarIcon from '@mui/icons-material/Star'
import TagIcon from '@mui/icons-material/Tag'

const CATEGORY_ICONS = {
  LanguageIcon: LanguageIcon,
  ColorLensIcon: ColorLensIcon,
  BiotechIcon: BiotechIcon,
  DesktopMacIcon: DesktopMacOutlinedIcon,
  TagIcon: TagIcon,
  AccountBalanceIcon: AccountBalanceIcon,
  StarIcon: StarIcon,
  DesignServicesIcon: DesignServicesIcon,
  MusicNoteIcon: MusicNoteIcon,
  ScienceIcon: ScienceIcon,
  LegendToggleIcon: LegendToggleIcon
} as const

type IconKey = keyof typeof CATEGORY_ICONS

function isObjKey<T extends object>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj
}

export const getCategoryIcon = (
  category: IconKey & string
): typeof CATEGORY_ICONS[IconKey] => {
  if (isObjKey(category, CATEGORY_ICONS)) {
    return CATEGORY_ICONS[category]
  }
  return CATEGORY_ICONS['LanguageIcon']
}
