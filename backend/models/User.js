
const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  profilePhoto: {
    type: Object,
    default: {
      url: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
      publicId: null,
    }
  },
  bio: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isAccountVerified: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user',
  localField: "_id"
})



userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET)
}

const User = mongoose.model('User', userSchema)

function validateRegisterUser(obj) {

  const schema = joi.object({
    userName: joi.string().trim().min(2).max(100).required(),
    email: joi.string().trim().min(5).max(100).required().email(),
    password: passwordComplexity().required(),
  })

  return schema.validate(obj)
}




function validateLoginUser(obj) {

  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
    password: joi.string().trim().min(8).required(),
  })

  return schema.validate(obj)
}


function validateUpdateUser(obj) {

  const schema = joi.object({
    userName: joi.string().trim().min(2).max(100),
    password: passwordComplexity(),
    bio: joi.string()
  })

  return schema.validate(obj)
}


function validateEmailUser(obj) {

  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email(),
  })

  return schema.validate(obj)
}

function validatePasswordUser(obj) {

  const schema = joi.object({
    password: passwordComplexity().required(),
  })

  return schema.validate(obj)
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateEmailUser,
  validatePasswordUser
}