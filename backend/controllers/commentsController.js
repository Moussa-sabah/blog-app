

const asyncHandler = require('express-async-handler')
const { Comment, validateCreateComment, validateUpdateComment } = require('../models/Comment')
const { User } = require('../models/User')

/**-------------------------------------
 * @desc Create new comment             
 * @route /api/comments                      
 * @method POST                        
 * @access private (only login)                      
---------------------------------------*/

module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body)
  if (error) {
  return  res.status(400).json({ message: error.details[0].message })
  }

  const profile = await User.findById(req.user.id)

  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.user.id,
    userName: profile.userName
  })

  res.status(201).json(comment)

})




/**-------------------------------------
 * @desc Get all comments            
 * @route /api/comments                      
 * @method GET                        
 * @access private (only admin)                      
---------------------------------------*/

module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate('user',['-password'])
  res.status(200).json(comments)
})

/**-------------------------------------
 * @desc  Delete comment           
 * @route /api/comments/:id                      
 * @method DELETE                        
 * @access private (only admin and user himself)                      
---------------------------------------*/

module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {

  const comment = await Comment.findById(req.params.id)

  if (!comment) {
  return  res.status(404).json({ message: 'Comment not found.' })
  }

  if (req.user.id === comment.user.toString() || req.user.isAdmin) {
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Comment has been deleted' ,
      id:comment._id,
    })
  }
  else {
    res.status(403).json({ message: 'Not allowed to delete the comment, only admin and suer himself can' })
  }
})


/**-------------------------------------
 * @desc  Update comment           
 * @route /api/comments/:id                      
 * @method PUT                        
 * @access private (only user himself)                      
---------------------------------------*/

module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {

  const { error } = validateUpdateComment(req.body)
  if (error) {
  return  res.status(400).json({ message: error.details[0].message })
  }


  const comment = await Comment.findById(req.params.id)
  if (!comment) {
  return  res.status(404).json({ message: 'Comment not found' })
  }

  if (req.user.id === comment.user.toString()) {
    const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
      $set: {
        text: req.body.text
      }
    }, {
      new: true
    })

    res.status(200).json(updateComment)
  }
  else {
    res.status(403).json({ message: 'Not allowed to update the comment, only user himself can' })
  }
})