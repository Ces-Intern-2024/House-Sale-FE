import { CODE_RESPONSE_400, CODE_RESPONSE_401, CODE_RESPONSE_404 } from '../constants/codeResponse'
import { axiosInstance } from './AxiosInstance'

export const getTransactionService = async () => {
  try {
    const res = await axiosInstance.get('/transaction')
    if (res.data) {
      return res.data.metaData
    }
  } catch (error: any) {
    if(error.response.status === CODE_RESPONSE_400){
      console.error('Error occurred when get all transactions')
    }else if(error.response.status === CODE_RESPONSE_401){
      console.error('Please Authenticate!')
    }else if(error.response.status === CODE_RESPONSE_404){
      console.error('User not found')
    }else{
      console.error(error)
    }
  }
}
