import axios from 'axios'
import qs from 'qs'
import { axiosInstance } from './AxiosInstance'
import {NUM_OF_RETURN_ELEMENTS, NUM_OF_RETURN_ELEMENTS_FOR_CAROUSEL} from '../constants/numOfReturnElements.constant'

export interface SearchProps {
  keyword?: string | null
  featureId?: number | null
  categoryId?: number | null
  provinceCode?: string | null
  districtCode?: string | null
  wardCode?: string | null
  priceFrom?: number | null
  priceTo?: number | null
  landAreaFrom?: number | null
  landAreaTo?: number | null
  areaOfUseFrom?: number | null
  areaOfUseTo?: number | null
  numberOfFloorFrom?: number | null
  numberOfFloorTo?: number | null
  numberOfBedRoomFrom?: number | null
  numberOfBedRoomTo?: number | null
  numberOfToiletFrom?: number | null
  numberOfToiletTo?: number | null
  page?: number | null
  limit?: number | null
  orderBy?: string | null
  sortBy?: string | null
}
export async function searchProperty(searchValues: SearchProps, isAll?:boolean) {

  const queryString = qs.stringify(searchValues, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  })

  

  const res = await axios.get(
    `/properties${queryString}${queryString.length === 0 
      ? `?limit=${isAll ? NUM_OF_RETURN_ELEMENTS_FOR_CAROUSEL : NUM_OF_RETURN_ELEMENTS}` 
      : `&limit=${isAll ? NUM_OF_RETURN_ELEMENTS_FOR_CAROUSEL : NUM_OF_RETURN_ELEMENTS}`}`,
  )

  return res.data.metaData
}

export async function searchPropertyForSeller(searchValues: SearchProps) {
  const queryString = qs.stringify(searchValues, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  })
  const res = await axiosInstance.get(`/seller/properties${queryString}`)
  return res.data.metaData
}
