import jwt from 'jsonwebtoken'
const salt = '$2a$10$hTZyUIFeDkGroVdXjjsZe.'

// Auth Response (token and user info)
export default function userAuthResponse(user) {
  user = user.toJSON()
  delete user.password

  return {
    token: jwt.sign({ id: user._id }, salt),
    user: user
  }
}
