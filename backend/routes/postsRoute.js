
const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const uploadPhoto = require('../middlewares/uploadPhoto')
const { createPostCtrl, getAllPostsCtrl, getOnePostCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require('../controllers/postsController')
const validateObjectId = require('../middlewares/validateObjectId')

router.route('/')
  .post(verifyToken, uploadPhoto.single('image'), createPostCtrl)
  .get(getAllPostsCtrl)

router.route('/count').get(getPostCountCtrl)

router.route('/:id')
  .get(validateObjectId, getOnePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl)

router.route('/update-image/:id')
  .put(validateObjectId, verifyToken, uploadPhoto.single('image'), updatePostImageCtrl)


  router.route('/likes/:id').put(verifyToken,toggleLikeCtrl)

module.exports = router