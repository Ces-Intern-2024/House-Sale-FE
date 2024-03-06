import { SearchProps } from '@/types/searchProps'
import qs from 'qs'
import { axiosInstance } from './AxiosInstance'

export const getPropertiesForAdminService = async (
  searchValues: SearchProps,
) => {
  const queryString = qs.stringify(searchValues, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  })
  const res = await axiosInstance.get(`/admin/manage-property${queryString}`)
  return res
}

export const getAllPropertiesForAdminSerivce = async () => {
  const res = await axiosInstance.get(`/admin/manage-property`)
  if (res.data) {
    return res.data
  }
}

export const updateStatusPropertyForAdminService = async (
  propertyId: number,
  status: string | null,
) => {
  const res = await axiosInstance.patch(
    `/admin/manage-property/${propertyId}/status`,
    { status },
  )
  return res
}
