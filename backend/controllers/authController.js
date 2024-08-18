
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { User, validateRegisterUser, validateLoginUser } = require('../models/User')
const VerificationToken = require('../models/VerificationToken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

/**-------------------------------------
 * @desc Register new user             * 
 * @route /api/auth/register           *                
 * @method POST                        *
 * @access public                      *
---------------------------------------*/

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  let user = await User.findOne({ email: req.body.email })
  if (user) {
    return res.status(400).json({ message: 'user already exist' })
  }


  const salt = await bcrypt.genSalt(10)
  req.body.password = await bcrypt.hash(req.body.password, salt)

  user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })

  await user.save()

  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString('hex')
  })

  await verificationToken.save()

  const link = `${process.env.CLIENR_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`

  const htmlTemplate = `
  <div>
  <p>Click on the link below to verify your email</p>
  <a href = "${link}" >Verify</a>
  </div>
  `

  await sendEmail(user.email, 'Verify Youy Email', htmlTemplate)

  res.status(201).json({ message: 'We sent to you email, check your email to verify your account' })
})




/**-------------------------------------
 * @desc Login user             
 * @route /api/auth/login                          
 * @method POST                       
 * @access public                     
---------------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body)
  if (error) {
  return  res.status(400).json({ message: error.details[0].message })
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).json({ message: 'invalid email or password' })
  }

  const checkPassword = await bcrypt.compare(req.body.password, user.password)

  if (!checkPassword) {
  return  res.status(400).json({ message: 'invalid email or password' })
  }

  if (!user.isAccountVerified) {
    const verificationToken = await VerificationToken.findOne({
      userId: user._id
    })

    if (!verificationToken) {
      verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex')
      })

      await verificationToken.save()
    }

    const link = `${process.env.CLIENR_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`

    const htmlTemplate = `
  <div>
  <p>Click on the link below to verify your email</p>
  <a href = "${link}" >Verify</a>
  </div>
  `

    await sendEmail(user.email, 'Verify Youy Email', htmlTemplate)

  return  res.status(400).json({ message: 'We sent to you email, check your email to verify your account' })
  }

  const token = user.generateAuthToken()

  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token: token,
    userName: user.userName
  })
})



/**-------------------------------------
 * @desc Verify User Email             
 * @route /api/auth/:userId/verify/:token                         
 * @method GET                       
 * @access public                     
---------------------------------------*/

module.exports.verificationUserEmail = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.userId)
  if (!user) {
  return  res.status(400).json({ message: "invalid id" })
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token
  })

  if (!verificationToken) {
  return  res.status(400).json({ message: "invalid id" })
  }

  user.isAccountVerified = true
  await user.save()

  await VerificationToken.deleteOne(verificationToken);

  res.status(200).json({ message: 'Your account is verified successfully' })
})