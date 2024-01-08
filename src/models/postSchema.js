const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:false
    },
    profileText: {
      type: String,
      required: false,
    },
    Text: [],
    file: {
      type:String,
      required:true
    },
    email:{
      type:String,
      required:false
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", postSchema);

module.exports = Profile;
