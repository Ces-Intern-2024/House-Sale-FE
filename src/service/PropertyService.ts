import { Properties } from '@/types'
import { axiosInstance } from './AxiosInstance'

export const addToWishListService = async (property: Properties) => {
  const res = await axiosInstance.post(`/favorites-list/${property.propertyId}`)
  if (res.data) {
    return res.data
  }
}

export const getAllWishListService = async () => {
  const res = await axiosInstance.get(`/favorites-list`)
  if (res.data) {
    return res.data.metaData.favoritesList
  }
}
