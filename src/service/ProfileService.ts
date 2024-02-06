import axios from 'axios'

export async function getProfile(accessToken: string | undefined) {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }
  try {
    const res = await axios.get('/user/profile', config)
    return res.data.metaData
  } catch (error) {
    console.error('Error getting profile user:', error)
    throw error
  }
}
