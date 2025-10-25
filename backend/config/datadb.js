import mongoose from "mongoose";

if (!mongoose.connection.readyState) {
    mongoose.connect("mongodb://localhost:27017/mernauth").then(() => {
        console.log("data's database connected..");
    }).catch((err) => {
        console.log("data's database connection failed...");
    });
}

const userSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    company: { type: String },
    category: { type: String },
    quantity: { type: Number },
    fileName: { type: String },
    url: { type: String },
    public_id: { type: String }
}, { timestamps: true });

const Data = mongoose.models.Data || mongoose.model("Data", userSchema);
export default Data;