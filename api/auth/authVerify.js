const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt')

const authVerify = (req, res, next) => {
  try {
    // check header or post parameters or url parameters for token
    const token = req.headers.authorization.split(" ")[1] || req.body.token || req.query.token     // Bearer
    if (!token) return res.json({ auth: false, message: 'Brak tokenu' })
    // verify token and set decoded value to new fields of request
    const decoded = jwt.verify(token, jwtConfig.secret)
    req.userToken = decoded
    console.log(req.userToken)
    next()
  } catch (error) {
    return res.json({ auth: false, message: 'Błąd autoryzacji tokenu' })
  }
}

module.exports = authVerify