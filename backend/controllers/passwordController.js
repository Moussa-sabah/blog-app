
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { User, validateEmailUser, validatePasswordUser } = require('../models/User')
const VerificationToken = require('../models/VerificationToken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

/**-------------------------------------
 * @desc Send Reset Password Link             
 * @route /api/password/forgot-password                 
 * @method POST                       
 * @access public                     
---------------------------------------*/

module.exports.sendResetPasswordLink = asyncHandler(async (req, res) => {

  const { error } = validateEmailUser(req.body)
  if (error) {
  return  res.status(400).json({ message: error.details[0].message })
  }

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
  return  res.status(400).json({ message: 'user is not found' })
  }

  let verificationToken = await VerificationToken.findOne({ userId: user._id })

  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex')
    })

    await verificationToken.save()
  }

  const link = `${process.env.CLIENR_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`

  const htmlTemplate = `<a href="${link}">Click here to reset yor password</a>`

  await sendEmail(user.email, 'Reset your password', htmlTemplate)

  res.status(200).json({ message: 'We send email for you to change password, check your inbox' })
})


/**-------------------------------------
 * @desc Get Reset Password Link             
 * @route /api/password/reset-password/:userId/:token             
 * @method GET                       
 * @access public                     
---------------------------------------*/

module.exports.getResetPasswordLink = asyncHandler(async (req, res) => {

  const user = await User.findOne({ _id: req.params.userId })
  if (!user) {
  return  res.status(400).json({ message: 'invalid link' })
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token
  })


  if (!verificationToken) {
  return  res.status(400).json({ message: 'invalid link' })
  }

  res.status(200).json({ message: 'you can reset your password' })

})


/**-------------------------------------
 * @desc  Reset Password form            
 * @route /api/password/reset-password/:userId/:token             
 * @method POST                       
 * @access public                     
---------------------------------------*/

module.exports.resetPassword = asyncHandler(async (req, res) => {
  const { error } = validatePasswordUser(req.body)
  if (error) {
  return  res.status(400).json({ message: error.details[0].message })
  }

  const user = await User.findOne({ _id: req.params.userId })
  if (!user) {
  return  res.status(400).json({ message: 'invalid link' })
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token
  })

  if (!verificationToken) {
  return  res.status(400).json({ message: 'invalid link' })
  }
  if (!user.isAccountVerified) {
    user.isAccountVerified = true
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  user.password = hashPassword

  await user.save()


  await VerificationToken.deleteOne(verificationToken)

  res.status(200).json({ message: 'Password has been changed successfully' })
})