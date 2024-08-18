

const mongoose = require('mongoose')
const joi = require('joi')

const categorySchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  title: {
    type: String,
    trim: true,
    required: true
  }
},{
  timestamps:true
})


const Category = mongoose.model('Category',categorySchema)

function validateCreateCategory (obj){

  const schema= joi.object({
    title:joi.string().trim().required()
  })

  return schema.validate(obj)

}


module.exports = {
  Category,
  validateCreateCategory
}