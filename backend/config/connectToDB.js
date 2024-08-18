
const mongoose = require('mongoose')

module.exports = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_CLOUD_URI)
    console.log('Connected successfully to mongoDB ^_^')
  } catch (error) {
    console.log('Connection faild to mongoDB')
  }
}
