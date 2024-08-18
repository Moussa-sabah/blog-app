
const asyncHandler = require('express-async-handler')
const { User } = require('../models/User')
const { validateUpdateUser } = require('../models/User')
const bcrypt = require('bcryptjs')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveMultipleImages } = require('../utils/cloudinary')
const fs = require('fs')
const { Post } = require('../models/Post')
const { Comment } = require('../models/Comment')
const { publicDecrypt } = require('crypto')
/**-------------------------------------
 * @desc Get all users profile         
 * @route /api/users/profile                         
 * @method GET                         
 * @access private (only admin)                    
---------------------------------------*/

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').populate('posts')
  res.status(200).json(users)
})


/**-------------------------------------
 * @desc Get all users profile         
 * @route /api/users/profile/:id                          
 * @method GET                       
 * @access public                      
---------------------------------------*/

module.exports.getOneUserCtrl = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id).select('-password').populate('posts')
  if (!user) {
  return  res.status(404).json({ message: 'user not found' })
  }

  res.status(200).json(user)
})



/**-------------------------------------
 * @desc  Update users profile         
 * @route /api/users/profile/:id                          
 * @method PUT                       
 * @access private (only the user)                      
---------------------------------------*/

module.exports.updateUserCtrl = asyncHandler(async (req, res) => {

  const { error } = validateUpdateUser(req.body)
  if (error) {
  return  res.status(400).json({ message: error.details[0].message })
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id,
    {
      $set: {
        userName: req.body.userName,
        password: req.body.password,
        bio: req.body.bio
      }
    },
    { new: true }
  ).select('-password')

  if (!updateUser) {
  return  res.status(404).json({ message: 'user not found' })
  }

  res.status(200).json(updateUser)
})


/**-------------------------------------
 * @desc Get users count         
 * @route /api/users/count                        
 * @method GET                       
 * @access private  (only admin)                    
---------------------------------------*/

module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments()
  res.status(200).json(count)
})


/**-------------------------------------
 * @desc user profile photo upload         
 * @route /api/users/count                        
 * @method POST                       
 * @access private  (only token)                    
---------------------------------------*/

module.exports.uploadUserImageCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
  return  res.status(400).json({ message: 'no file' })
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

  const result = await cloudinaryUploadImage(imagePath)
  console.log(result)
  const user = await User.findById(req.user.id)

  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId)
  }

  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id
  }

  await user.save()

  res.status(200).json({
    message: 'user profile photo uploaded successfully  ',
    profilePhoto: user.profilePhoto
  })

  fs.unlinkSync(imagePath)
})



/**-------------------------------------
 * @desc delete user profile         
 * @route /api/users/profile/:id                            
 * @method DELETE                       
 * @access private  (only admin and user himself)                    
---------------------------------------*/

module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id)

  if (!user) {
  return  res.status(400).json({ message: 'not found' })
  }

  const posts = await Post.find({ user: user._id })
  const publicIdsArray = posts?.map((post) => { post.image.publicId })

  if (publicIdsArray?.length > 0) {
    await cloudinaryRemoveMultipleImages(publicIdsArray)
  }


  if(user.profilePhoto.publicId!==null){
    await cloudinaryRemoveImage(user.profilePhoto.publicId)
  }
  await Post.deleteMany({ user: user._id })
  await Comment.deleteMany({ user: user._id })
  await User.findByIdAndDelete(req.params.id)

  res.status(200).json({ message: 'user has been deleted' })
})