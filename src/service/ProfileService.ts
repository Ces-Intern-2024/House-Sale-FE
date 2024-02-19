import { axiosInstance } from '../service/AxiosInstance'
import axios from 'axios'

export async function getProfile() {
  try {
    const res = await axiosInstance.get('/user/profile')
    return res.data.metaData
  } catch (error) {
    console.error('Error getting profile user:', error)
    throw error
  }
}

export async function uploadAvatarToCloudinary(formData: FormData) {
  const res = await axios.post(
    'https://api.cloudinary.com/v1_1/modernhouse/image/upload',
    formData,
    {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    },
  )
  return res.data
}

export async function uploadAvatar(imageUrl: string | null) {
  const res = await axiosInstance.post(`/user/update-avatar`, {
    imageUrl: imageUrl ? imageUrl : 'null',
  })
  return res.data
}

export async function changePassword(values: object) {
  const res = await axiosInstance.post('/user/change-password', { ...values })
  return res.data
}
