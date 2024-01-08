
const mongoose = require("mongoose")

const url = process.env.MONGODB_URL

try {
    mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology: true})
  console.log("database connection succesfully");
} catch (error) {
    console.log(error);
} 