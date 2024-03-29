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

export const deleteUserForAdminService = async (listUserId: string) => {
  const res = axiosInstance.delete(`/admin/manage-user?userId=${listUserId}`)
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

export async function getAllTransactions(fromDateRange?:string | null, toDateRange?:string | null, page?:number) { 
  const queryString = qs.stringify({fromDateRange, toDateRange, page}, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  }) 
  
const res = await axiosInstance.get(`/admin/manage-transaction/deposit${queryString}`)
    
  return res.data.metaData
}

export async function getAllConversionRates(){
  const res = await axiosInstance.get('/admin/manage-conversion-rate')
  return res.data.metaData
}

export async function addNewCurrencyRate(currencyFrom:string, currencyTo:string, exchangeRate:number){
  const res = await axiosInstance.post('/admin/manage-conversion-rate',{currencyFrom,currencyTo,exchangeRate})
  return res
}

export async function editConversionRate(conversionRateId:number, newExchangeRate:number){
  const res = await axiosInstance.patch(`/admin/manage-conversion-rate/${conversionRateId}`,{newExchangeRate})
  return res
}

export async function deleteConversionRate(conversionRateId:number){
  const res = await axiosInstance.delete(`/admin/manage-conversion-rate/${conversionRateId}`)
  return res
}


export const disablePropertyForAdminService = async (listPropertyId: string) => {
  const res = await axiosInstance.patch(`/admin/manage-property/disable?propertyId=${listPropertyId}`)
  return res
}

export const resetPasswordForAdmin = async (userId: number) => {
 const res = await axiosInstance.post(`/admin/manage-user/${userId}/reset-password`)
 return res
}


export async function getPropertiesCountedByFeature(){
  const res = await axiosInstance.get("/admin/report/count-properties-by-feature")
  return res.data
}

export async function getPropertiesCountedByCategory(){
  const res = await axiosInstance.get("/admin/report/count-properties-by-category")
  return res.data
}

export const countPropertiesCreated = async (fromDateRange : string, toDateRange :string) => {
  const res = await axiosInstance.get(`/admin/report/count-properties-created-by-date?fromDateRange=${fromDateRange}&toDateRange=${toDateRange}`)
  return res
}
