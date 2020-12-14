// Imports
import jwt from 'jsonwebtoken'

// App Imports
import User from '../Model/User'
const salt = '$2a$10$hTZyUIFeDkGroVdXjjsZe.'

// Authentication middleware
export default async function authentication (request, response, next) {
  try {
    let header = request.headers.authentication    

  if (header) {
    try {
      const token = header.split(' ')
      const userToken = jwt.verify(token[1], salt)
      let user = await User.findOne({ _id: userToken.id })

      if (user) {
        return {
          isAuthenticated: true,
          user: user
        }
      }
    } catch (e) {
      console.warn('Invalid token detected.')
    }
  } else {
    return {
      isAuthenticated: false,
      user: null
    }
  }

  next()
  }
  catch(error) {
    console.log(error)
  }
}
