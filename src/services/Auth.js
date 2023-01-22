import Client from './api'
import { clientId } from '../globals'
// import { redirectUrl, oauth2BaseUrl } from '../globals'
export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateUser = async (data) => {
  try {
    const res = await Client.put(`/users/id/${data.userId}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdatePassword = async (data) => {
  try {
    const res = await Client.put(
      `/auth/update_password/user_id/${data.userId}`,
      data
    )
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateAmount = async (data) => {
  try {
    const res = await Client.put(`/items/update/${data.itemId}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

// kroger login

// Authorization code redirect initiated by 'login' event from Sign In button
// export const redirectToLogin = () => {
//   // Must define all scopes needed for application
//   const scope = encodeURIComponent(
//     'product.compact cart.basic:write profile.compact'
//   )
//   // Build authorization URL
//   const url =
//     // Base URL (https://api.kroger.com/v1/connect/oauth2)
//     `${oauth2BaseUrl}/authorize?` +
//     // ClientId (specified in .env file)
//     `client_id=${encodeURIComponent(clientId)}` +
//     // Pre-configured redirect URL (http://localhost:3000/)
//     `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
//     // Grant type
//     `&response_type=code` +
//     // Scope specified above
//     `&scope=${scope}`
//   // Browser redirects to the OAuth2 /authorize page
//   window.location = url
// }

// export const handleCallback = () => {
//   const accessToken = cookies.get('accToken')
//   const refreshToken = cookies.get('refToken')

//   if (!accessToken) {
//     return false
//   }
//   // Store tokens client side for API requests
//   storeTokens(accessToken, refreshToken)

//   cookies.remove('accToken')
//   cookies.remove('refToken')

//   return true
// }
