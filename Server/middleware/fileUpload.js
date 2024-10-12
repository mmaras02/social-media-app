const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    //destination where we want to store images
    destination:(req, file, callback) => {
        //const uploadPath = path.join(__dirname, '../../Client/public/uploads/');
        callback(null, '../Client/public/uploads');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
    
})
//console.log("in storage",storage);
const upload = multer({storage: storage}).single('image');

module.exports = upload;