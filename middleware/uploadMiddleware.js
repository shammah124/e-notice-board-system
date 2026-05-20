const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/results");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf/;

  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }

  cb("Only PDF files are allowed");
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
