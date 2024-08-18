const { sendResetPasswordLink, getResetPasswordLink, resetPassword } = require('../controllers/passwordController')


const router = require('express').Router()


router.route('/forgot-password').post(sendResetPasswordLink)

router
  .route('/reset-password/:userId/:token')
  .get(getResetPasswordLink)
  .post(resetPassword)


module.exports = router