
const express = require('express')
const app = express()
const connectToDB = require('./config/connectToDB')
const { notFoundError, errorHandler } = require('./middlewares/error')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiting = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
require('dotenv').config()

// config/connectToDB
connectToDB()


app.use(express.json())

app.use(xss())

app.use(rateLimiting({
  windowMs: 10 * 60 * 1000,
  max: 200,
}))

app.use(helmet())
app.use(hpp())
app.use(cors({
  origin: 'http://localhost:3000'
}))


app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/users', require('./routes/usersRoute'))
app.use('/api/posts', require('./routes/postsRoute'))
app.use('/api/comments', require('./routes/commentsRoute'))
app.use('/api/categories', require('./routes/categoriesRoute'))
app.use('/api/password', require('./routes/passwordRoute'))

app.use(notFoundError)
app.use(errorHandler)

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} and mode on port ${port}`)
})