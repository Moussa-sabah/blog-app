

const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const author = req.headers.authorization
  if (author) {
    try {
      const token = author.split(' ')[1]
      const decodedAuthor = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decodedAuthor
      next()
    } catch (error) {
      res.status(401).json({ message: 'invaild token ' })
    }
  }
  else {
    res.status(401).json({ message: 'no token provider' })
  }
}

function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next()
    }
    else {
      return res.status(403).json({ message: 'not allowed, only admins' })
    }
  })
}

function verifyTokenAndUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.params.id === req.user.id) {
      next()
    }
    else {
      return res.status(403).json({ message: 'not allowed, only user' })
    }
  })
}

function verifyTokenAndUserAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.params.id == req.user.id || req.user.isAdmin) {
      next()
    }
    else {
      return res.status(403).json({ message: 'not allowed, only user and admin' })
    }
  })
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndUserAndAdmin
}