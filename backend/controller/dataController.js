import Data from "../config/datadb.js";
import { v2 as cloudinary } from 'cloudinary';
export const addData = async (req, res) => {
    try {
        const { name, price, company, category, quantity } = req.body;
        const file = req.file;
        if (!name || !price || !company || !category || !quantity || !file) {
            return res.status(400).json({ success: false, message: "Please provide name, price, company, category, quantity and file..." });
        }
        let result = new Data({ name, price, company, category, quantity, fileName: file.originalname, url: file.path, public_id: file.filename });
        let data = await result.save();
        return res.status(200).json({ success: true, data, message: "all Data inserted..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

export const getData = async (req, res) => {
    try {
        const price = req.query.price;
        const sorted = {};
        if (price == "asc") {
            sorted.price = 1;
        }
        if (price == "desc") {
            sorted.price = -1;
        }
        let data = await Data.find({}).sort(sorted);
        return res.status(200).json({ success: true, data, message: "all Data..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

export const getSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        let data = await Data.findOne({ _id: id });
        return res.status(200).json({ success: true, data, message: "single Data..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

export const updateSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, price, company, category, quantity } = req.body;
        let newFile = "";
        let newfileName = "";
        let newpublicId = "";
        if (req.file) {
            newFile = req.file.path;
            newfileName = req.file.originalname;
            newpublicId = req.file.filename;
            try{
                cloudinary.uploader.destroy(req.body.publicId);
                console.log("file deleted in update...");
            }
            catch(err){
                console.log("file is not delete in update...",err.message);
            }
        }
        else {
            newFile = req.body.oldFile;
            newfileName = req.body.fileName;
            newpublicId = req.body.publicId;
        }
        let result = await Data.updateOne({ _id: id }, { $set: { name, price, company, category, quantity, fileName: newfileName, url: newFile, public_id: newpublicId } });
        return res.status(200).json({ success: true, result, message: "update Data..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

export const deleteSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        let result = await Data.findByIdAndDelete(id);
        try{
            cloudinary.uploader.destroy(result.public_id);
            console.log("file deleted...");
        }
        catch(err){
            console.log("file is not delete...",err.message);
        }
        return res.status(200).json({ success: true, result, message: "Data deleted..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}

export const search = async (req, res) => {
    try {
        const query = req.params.key;
        let result = await Data.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { company: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } }
            ]
        });
        return res.status(200).json({ success: true, result, message: "search Data..." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "something went wrong...", error: err.message });
    }
}