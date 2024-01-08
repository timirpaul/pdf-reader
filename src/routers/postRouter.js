const express =require("express");
const upload = require("../middlewares/multer")
const { newPostController, searchController, getAllController, newPostBufferController, getPdfController, deleteController } = require("../controllers/postControllers");

const Router =express.Router()

//post
Router.post("/upload",upload.single("upload-file"),newPostController)

//get
Router.get("/all",getAllController)
//Search
Router.post("/search",searchController)
//Delete All
Router.delete("/delete",deleteController)



module.exports=Router;