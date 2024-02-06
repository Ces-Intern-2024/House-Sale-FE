import axios from 'axios'
import { getItem } from '../utils/localStorage'

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
  const accessToken = getItem('data')?.tokens.accessToken
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  const res = await axios.post(
    `/user/update-avatar`,
    { imageUrl: imageUrl ? imageUrl : 'null' },
    config,
  )
  return res.data
}
