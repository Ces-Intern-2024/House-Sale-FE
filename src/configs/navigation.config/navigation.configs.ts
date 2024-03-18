import { NavigationTree } from '../../types/navigation'
import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from '../../constants/navigation.constant'

export const navigationConfigs: NavigationTree[] = [
  {
    key: 'for-rent',
    path: '/for-rent',
    title: 'FOR RENT',
    icon: '',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [],
  },
  {
    key: 'for-sale',
    path: '/for-sale',
    title: 'FOR SALE',
    icon: '',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [],
    subMenu: [],
  },
  {
    key: 'about-us',
    path: '/about-us',
    title: 'ABOUT US',
    icon: '',
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: 'feedback',
    path: '/feedback',
    title: 'FEEDBACK',
    icon: '',
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
]
