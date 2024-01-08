const pdfText = require("../utils/pdf-parse");
const fs = require("fs");
const Profile = require("../models/postSchema");

// Remove empty elements from the array
const newArrayWithoutEmptyElements = (arrayWithEmptyElements) =>
  arrayWithEmptyElements.filter((element) => {
    return element.trim() !== "";
  });

//
const getAllController = async (req, res) => {
  try {
    const data = await Profile.find({});

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error" });
  }
};

const newPostController = async (req, res) => {
  try {
    const filePath = req.file?.path;
    const {email , name ,firebaseFileURL}=req.body

    console.log(req.body);
    // console.log("email",email);
    // console.log("name",name);
    // console.log("firebaseFileURL",firebaseFileURL);

    // console.log("file", filePath);

    if (!filePath) return res.status(200).json("Invalid pdf");
    
    const data = await pdfText(filePath);
     
    const profileText = data?.text?.trim();
    const text = profileText.toLowerCase().split(" ");

    // console.log("profileText", profileText);
    console.log("profilePath", filePath);

    const withoutEmptyElements = newArrayWithoutEmptyElements(text);
    // console.log("text", withoutEmptyElements);

   

    const profile = await  Profile.create({
      //Profile.create missing
      name: name,
      profileText: profileText,
      Text: withoutEmptyElements,
      file:firebaseFileURL,
      email:email
    });
// console.log(profile);
    await fs.unlinkSync(filePath);
    res.status(200).json({  msg: "success",profile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};



const searchController = async (req, res) => {
  try {
    let data ,arr;
    const {search }  = req.body;
    console.log(search );
    if(!search) return res.status(200).json("Invalid Search");
  // if(search.indexOf(",") != -1) console.log("true",search.indexOf(","),search.indexOf(",") != -1 )
    if(search.indexOf(",") != -1){
       arr = search.toLowerCase().replace(/\s/g, "").split(",");
      console.log(arr , "All");
       data = await Profile.find({ Text: { $all: arr } });
    }else{
       arr = search.toLowerCase().replace(/\s/g, "").split("/");
      console.log("/",arr);
       data = await Profile.find({ Text: { $in: arr } });
    }
    // arr = search.toLowerCase().replace(/\s/g, "").split(",");
    // console.log(arr);
    //  data = await Profile.find({ Text: { $in: arr } });
    console.log(data.length);
    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log("err",error);
    res.status(500).json({ msg: "error" });
  }
};

//delete all
const deleteController = async (req,res)=>{
  try {
    const {_id} = req.body
    console.log(_id);
    const resData = await Profile.findByIdAndDelete(_id)
    res.status(200).json({msg:"success",resData})
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"failed"})
  }
}
module.exports = {
  newPostController,
  searchController,
  getAllController,
  deleteController
};
