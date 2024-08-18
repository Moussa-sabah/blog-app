
const router = require('express').Router()
const { getAllUsersCtrl, getOneUserCtrl, updateUserCtrl, getUsersCountCtrl, uploadUserImageCtrl, deleteUserProfileCtrl } = require('../controllers/usersController')
const { verifyTokenAndAdmin, verifyTokenAndUserAndAdmin } = require('../middlewares/verifyToken')
const validateObjectId = require('../middlewares/validateObjectId')
const { verifyTokenAndUser, verifyToken } = require('../middlewares/verifyToken')
const uploadPhoto = require('../middlewares/uploadPhoto')

router.route('/profile')
  .get(verifyTokenAndAdmin, getAllUsersCtrl)

router.route('/profile/:id')
  .get(validateObjectId, getOneUserCtrl)
  .put(validateObjectId, verifyTokenAndUser, updateUserCtrl)
  .delete(validateObjectId, verifyTokenAndUserAndAdmin, deleteUserProfileCtrl)

router.route('/count').get(verifyTokenAndAdmin, getUsersCountCtrl)

router.route('/profile/upload-profile-photo')
  .post(verifyToken, uploadPhoto.single('image'), uploadUserImageCtrl)


module.exports = router