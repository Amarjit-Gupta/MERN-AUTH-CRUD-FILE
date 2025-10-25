import express from 'express';
import { addData, deleteSingleData, getData, getSingleData, search, updateSingleData } from '../controller/dataController.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const dataRoute = express.Router();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"mern-folder"
    }
});

const upload = multer({storage:storage});

dataRoute.post("/addData",upload.single("file"), addData);
dataRoute.get("/getData", getData);
dataRoute.get("/getSingleData/:id", getSingleData);
dataRoute.put("/updateSingleData/:id",upload.single("file"), updateSingleData);
dataRoute.delete("/deleteSingleData/:id", deleteSingleData);
dataRoute.get("/search/:key", search);

export default dataRoute;