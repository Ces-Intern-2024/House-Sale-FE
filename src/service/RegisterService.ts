import axios from 'axios'

export async function register(user: any, isSeller: boolean) {
  let res: any
  delete user.confirmPassword
  console.log(user)

  try {
    if (isSeller) {
      res = await axios.post('/user/register-seller', user)
    } else {
      const { email, password } = user
      res = await axios.post('/user/register-user', { email, password })
    }
    return res.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}
