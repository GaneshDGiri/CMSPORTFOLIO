const multer = require('multer');
const path = require('path');

// Configure Multer to save files to the local 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Saves to Backend/uploads/
  },
  filename: function (req, file, cb) {
    // Renames the file to be unique (e.g., 16987654321-doc.png)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
module.exports = upload;