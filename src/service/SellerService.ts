import { axiosInstance } from './AxiosInstance'

export const getTransactionService = async () => {
  const res = await axiosInstance.get('/transaction')
  if (res.data) {
    return res.data.metaData
  }
}
