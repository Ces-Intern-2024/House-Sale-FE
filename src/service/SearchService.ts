import axios from 'axios'
import qs from 'qs'
import { axiosInstance } from './AxiosInstance'
import {NUM_OF_RETURN_ELEMENTS, NUM_OF_RETURN_ELEMENTS_FOR_CAROUSEL} from '../constants/numOfReturnElements.constant'
import { SearchProps } from '../types/searchProps'

export async function searchProperty(
  searchValues: SearchProps,
  isAll?: boolean,
) {
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


