import { REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY } from '../constants/google.constant'
import axios from 'axios'

export const geocode = async (location: string) => {
  const res = await axios.get(
    'https://maps.googleapis.com/maps/api/geocode/json',
    {
      params: {
        address: location,
        key: REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
      },
    },
  )
  return res
}
