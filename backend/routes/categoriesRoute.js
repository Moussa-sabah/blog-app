

const router = require('express').Router()
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken')
const {createCategoryCtrl, getAllCategoriesCtrl, deleteCategoryCtrl} = require('../controllers/categoriesController')
const validateObjectId = require('../middlewares/validateObjectId')

router.route('/')
.post(verifyTokenAndAdmin,createCategoryCtrl)
.get(getAllCategoriesCtrl)


router.route('/:id').delete(validateObjectId,verifyTokenAndAdmin,deleteCategoryCtrl)

module.exports = router