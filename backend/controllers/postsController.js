
const asyncHandler = require('express-async-handler')
const { Post, validateCreatePost, validateUpdatePost } = require('../models/Post')
const path = require('path')
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require('../utils/cloudinary')
const fs = require('fs')
const { Comment } = require('../models/Comment')

/**-------------------------------------
 * @desc Create new post              
 * @route /api/posts                         
 * @method POST                        
 * @access private (only login)                      
---------------------------------------*/

module.exports.createPostCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
  return  res.status(400).json({ message: 'please add photo to your post' })
  }

  const { error } = validateCreatePost(req.body)
  if (error) {
  return  res.status(400).json({ message: error.details[0].message })
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

  const reslut = await cloudinaryUploadImage(imagePath)

  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: {
      url: reslut.secure_url,
      publicId: reslut.public_id
    },
    user: req.user.id,
  })


  res.status(201).json(post)

  fs.unlinkSync(imagePath)
})


/**-------------------------------------
 * @desc Get all posts              
 * @route /api/posts                         
 * @method Get                        
 * @access public                    
---------------------------------------*/

module.exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  const { pageNumber, category } = req.query
  const post_per_page = 3
  let posts
  if (pageNumber) {
    posts = await Post.find()
      .skip((pageNumber - 1) * post_per_page)
      .limit(post_per_page)
      .populate('user', ['-password'])
      .sort({ createdAt: -1 })
  }

  else if (category) {
    posts = await Post.find({ category })
      .populate('user', ['-password'])
      .sort({ createdAt: -1 })
  }

  else {
    posts = await Post.find()
      .populate('user', ['-password'])
      .sort({ createdAt: -1 })
  }

  res.status(200).json(posts)
})


/**-------------------------------------
 * @desc Get one post              
 * @route /api/posts/:id                         
 * @method Get                        
 * @access public                    
---------------------------------------*/

module.exports.getOnePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('comments')
    .populate('user', ['-password'])

  if (!post) {
  return  res.status(404).json({ message: 'not found' })
  }
  res.status(200).json(post)
})


/**-------------------------------------
 * @desc Get post count             
 * @route /api/posts/count                         
 * @method Get                        
 * @access public                    
---------------------------------------*/

module.exports.getPostCountCtrl = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments()
  res.status(200).json(count)
})


/**-------------------------------------
 * @desc Delete post             
 * @route /api/posts/:id                         
 * @method DELETE                        
 * @access private (only admin and user himself)                    
---------------------------------------*/

module.exports.deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
  return  res.status(400).json({ message: 'not found' })
  }
  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id)
    await cloudinaryRemoveImage(post.image.publicId)
    await Comment.deleteMany({ postId: post._id })
    res.status(200).json({ message: 'post has been deleted' })
  }
  else {
    res.status(403).json({
      message: 'not allowed to delete post, only admin and user himself can.',
      postId: post._id,
    })
  }
})


/**-------------------------------------
 * @desc Update post             
 * @route /api/posts/:id                         
 * @method PUT                        
 * @access private (only user himself)                    
---------------------------------------*/

module.exports.updatePostCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body)
  if (error) {
  return  res.status(400).json({ message: error.details[0].message })
  }


  const post = await Post.findById(req.params.id)
  if (!post) {
  return  res.status(404).json({ message: 'Not found post' })
  }

  if (req.user.id !== post.user.toString()) {
    res.status(403).json({ message: 'Not allowed to update post, only user himself can.' })
  }

  const postUpdate = await Post.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category
    }
  }, {
    new: true
  }).populate('user', ['-password'])
  .populate('comments')

  res.status(200).json(postUpdate)

})

/**-------------------------------------
 * @desc Update post image             
 * @route /api/posts/update-image/:id                         
 * @method PUT                        
 * @access private (only user himself)                    
---------------------------------------*/
module.exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
  return  res.status(400).json({ message: 'please choose an image to update' })
  }

  const post = await Post.findById(req.params.id)
  if (!post) {
  return  res.status(404).json({ message: 'Not found post' })
  }

  if (req.user.id !== post.user.toString()) {
    res.status(403).json({ message: 'Not allowed to update post, only user himself can.' })
  }


  await cloudinaryRemoveImage(post.image.publicId)

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`)

  const result = await cloudinaryUploadImage(imagePath)

  const updatePost = await Post.findByIdAndUpdate(req.params.id, {
    $set: {
      image: {
        url: result.secure_url,
        publicId: result.public_id
      }
    }
  }, {
    new: true
  })


  res.status(200).json(updatePost)
})



/**-------------------------------------
 * @desc Update post likes             
 * @route /api/posts/likes/:id                         
 * @method PUT                        
 * @access private (only login)                    
---------------------------------------*/

module.exports.toggleLikeCtrl = asyncHandler(async (req, res) => {

  const { id: paramsId } = req.params

  let post = await Post.findById(paramsId)

  if (!post) {
  return  res.status(404).json({ message: 'Not find post' })
  }

  const loggerId = req.user.id

  const isPostLiked = post.likes.find((user) => user.toString() === loggerId)

  if (isPostLiked) {
    post = await Post.findByIdAndUpdate(paramsId, {
      $pull: {
        likes: loggerId
      }
    }, {
      new: true
    })
  }

  else {
    post = await Post.findByIdAndUpdate(paramsId, {
      $push: {
        likes: loggerId
      }
    }, {
      new: true
    })
  }

  res.status(200).json(post)

})