import { SearchProps } from '@/types/searchProps'
import qs from 'qs'
import { axiosInstance } from './AxiosInstance'

// export const getTransactionRentService = async () => {
//   const res = await axiosInstance.get('/transaction/rent-service')
//   if (res.data) {
//     return res
//   }
// }

export async function getTransactionRentService(fromDateRange?:string | null, toDateRange?:string | null) { 
      const queryString = qs.stringify({fromDateRange, toDateRange}, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  }) 
  
const res = await axiosInstance.get(`/transaction/rent-service${queryString}
${queryString.length === 0 ? `?limit=1000` : `&limit=1000`}`)
    
    return res.data.metaData.data
}

export const getAllPropertiesForSellerService = async () => {
  const res = await axiosInstance.get('/seller/properties')
  return res
}

export const deletePropertiesForSellerService = async (propertyId: number) => {
  const res = await axiosInstance.delete(`/seller/properties/${propertyId}`)
  return res
}

export const updateStatusPropertiesForSellerService = async (
  propertyId: number,
  status: string,
) => {
  const res = await axiosInstance.patch(
    `/seller/properties/${propertyId}/status`,
    { status },
  )
  return res
}
export async function searchPropertyForSeller(searchValues: SearchProps) {
  const queryString = qs.stringify(searchValues, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  })
  const res = await axiosInstance.get(`/seller/properties${queryString}`)
  return res
}
