import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";

config();

// config Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "files",
    },
  }),
}).single("file");
