import { Properties } from '@/types'
import { axiosInstance } from './AxiosInstance'
import { CODE_RESPONSE_400, CODE_RESPONSE_401, CODE_RESPONSE_404 } from '../constants/codeResponse'

export const addToWishListService = async (property: Properties) => {
  try {
    const res = await axiosInstance.post(
      `/favorites-list/${property.propertyId}`,
    )
    if (res.data) {
      return res.data
    }
  } catch (error: any) {
    if (error.response.status === CODE_RESPONSE_400) {
      console.error(
        'Error occurred when add new property to your favorites list!',
      )
    } else if (error.response.status === CODE_RESPONSE_401) {
      console.error('Please Authenticate')
    } else if (error.response.status === CODE_RESPONSE_404) {
      console.error(
        'This property is not available now. Please try another property!',
      )
    } else {
      console.error(error)
    }
  }
}

export const getAllWishListService = async () => {
  try {
    const res = await axiosInstance.get(`/favorites-list`)
    if (res.data) {
      return res.data.metaData.favoritesList
    }
  } catch (error: any) {
    if (error.response.status === CODE_RESPONSE_404) {
      console.error('User not found')
    } else if (error.response.status === CODE_RESPONSE_401) {
      console.error('Please Authenticate!')
    } else {
      console.error(error)
    }
  }
}
