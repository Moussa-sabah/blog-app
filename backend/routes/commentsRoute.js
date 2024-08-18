

const router = require('express').Router()
const {createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommentCtrl} = require('../controllers/commentsController')
const {verifyToken, verifyTokenAndAdmin} = require('../middlewares/verifyToken.js')
const  validateObjectId = require('../middlewares/validateObjectId.js')

router.route('/')
.post(verifyToken,createCommentCtrl)
.get(verifyTokenAndAdmin,getAllCommentsCtrl)

router.route('/:id')
.delete(validateObjectId,verifyToken,deleteCommentCtrl)
.put(validateObjectId,verifyToken,updateCommentCtrl)

module.exports = router