import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        crypto.randomBytes(12,async (error,bytes)=>{
           const fn = await bytes.toString("hex") + path.extname(file.originalname);
           cb(null,fn)
        })
    }
})
const upload = multer({storage});
export default upload;