const multer=require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //konse folder ke ander this particular file ko store krna h 
      cb(null, path.join(__dirname, '../uploads')) //(error,folder ka name), cb=callback
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
});
  
const upload = multer({ storage: storage });

module.exports=upload;
