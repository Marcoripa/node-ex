const multer = require("multer");

//Set up storage for uploaded files
const storage = multer.diskStorage({
  //set file destination
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  //set file name
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
