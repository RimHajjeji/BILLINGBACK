const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const secret_access = process.env.ACCESS_TOKEN_KEY
const secret_refresh = process.env.REFRESH_TOKEN_KEY
const accessToken = (user) => {
    if (user.id)
        return jwt.sign({ id: user.id }, secret_access, { expiresIn: '2h' })
    else return jwt.sign({ id: user }, secret_access, { expiresIn: '2h' })

}
const refreshToken = (user) => {
    if (user.id)
        return jwt.sign({ id: user.id }, secret_refresh, { expiresIn: '2h' })
    else return jwt.sign({ id: user }, secret_refresh, { expiresIn: '2h' })
}
module.exports = {
    refreshToken,
    accessToken,
}