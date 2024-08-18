
const router = require('express').Router()
const { registerUserCtrl, loginUserCtrl, verificationUserEmail } = require('../controllers/authController')


router.post('/register', registerUserCtrl)
router.post('/login', loginUserCtrl)
router.get('/:userId/verify/:token', verificationUserEmail)
module.exports = router