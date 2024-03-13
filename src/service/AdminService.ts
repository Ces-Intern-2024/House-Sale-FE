import { SearchProps } from '@/types/searchProps'
import qs from 'qs'
import { axiosInstance } from './AxiosInstance'
import { SearchUsers } from '@/types/searchUsers'

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

export const getAllUsersForAdminService = async () => {
  const res = await axiosInstance.get(`/admin/manage-user`)
  if (res.data) {
    return res.data
  }
}

export const getUsersForAdminService = async (searchValues: SearchUsers) => {
  const queryString = qs.stringify(searchValues, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  })
  const res = await axiosInstance.get(`/admin/manage-user${queryString}`)
  if (res.data) {
    return res.data
  }
}

export const updateStatusUserForAdminService = async (userId: number) => {
  const res = axiosInstance.patch(`/admin/manage-user/${userId}/active`)
  return res
}

export const updateUserProfileForAdminService = async (
  updateUser: any,
  userId: number,
) => {
  const res = axiosInstance.patch(`/admin/manage-user/${userId}`, {
    ...updateUser,
  })
  return res
}

export const deleteUserForAdminService = async (userId: number) => {
  const res = axiosInstance.delete(`/admin/manage-user/${userId}`)
  return res
}

export const deletePropertyForAdminService = async (
  listPropertyId:string,
) => {
  const res = await axiosInstance.delete(
    `/admin/manage-property?propertyId=${listPropertyId}`,
  )
  return res
}
