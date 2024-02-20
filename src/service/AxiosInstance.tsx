import axios from 'axios'
import moment from 'moment'
import { jwtDecode } from 'jwt-decode'
import storage from 'redux-persist/lib/storage'
import { store } from '../redux/store'
import { signInSuccess } from '../redux/reducers/sessionSlice'

interface DecodedToken {
  sub: number
  iat: number
  exp: number
  type: string
}

console.log('interceptor')

const baseURL = 'https://housesale.tldev.id.vn/v1/api/'

export const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use(async (req) => {
  if (
    req.url?.endsWith('/user/refreshTokens') ||
    req.url?.startsWith('https://api.cloudinary.com')
  ) {
    delete req.headers.Authorization
    return req
  }

  const rawPersistData = await storage.getItem('persist:primary')
  console.log('persist: ' + JSON.stringify(rawPersistData))
  let authToken
  if (rawPersistData !== null) {
    const parsedPersistData = JSON.parse(rawPersistData)
    const sessionState = JSON.parse(parsedPersistData.session)
    authToken = sessionState.tokens

    if (!authToken) {
      const state: any = store.getState()
      authToken = state.session.tokens
    }
  }

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await axios.post(`/user/refreshTokens`, {
        refreshToken,
      })

      store.dispatch(
        signInSuccess({
          signedIn: true,
          tokens: { ...response.data.metaData },
        }),
      )

      return response.data.metaData
    } catch (error) {
      console.error('Error refreshing access token:', error)
      return null
    }
  }

  if (authToken?.accessToken) {
    req.headers.Authorization = `Bearer ${authToken.accessToken}`

    const decodedToken: DecodedToken = jwtDecode(authToken.accessToken)
    if (moment().isAfter(moment.unix(decodedToken.exp))) {
      const newTokens = await refreshAccessToken(authToken.refreshToken)
      if (newTokens) {
        req.headers.Authorization = `Bearer ${newTokens.accessToken}`
      }
    }
  }

  return req
})
