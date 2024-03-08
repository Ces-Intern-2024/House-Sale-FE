import axios from "axios";
import { axiosInstance } from "./AxiosInstance";
import qs from 'qs'

export async function getConversionRateList() {
    const res = await axios.get('/conversion-rate')
    return res.data.metaData
}

export async function proceedToPayment(amount: number, description?: string) {
    const res = await axiosInstance.post('/transaction/deposit', {amount, description})

    return res.data
}

export async function getTransactionHistory(fromDateRange?:string | null, toDateRange?:string | null) { 
      const queryString = qs.stringify({fromDateRange, toDateRange}, {
    skipNulls: true,
    addQueryPrefix: true,
    encode: false,
  }) 
  

const res = await axiosInstance.get(`/transaction/deposit${queryString}
${queryString.length === 0 ? `?limit=1000` : `&limit=1000`}`)
    
    return res.data.metaData.data
}