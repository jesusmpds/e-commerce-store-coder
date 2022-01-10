const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/images/products/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(
      null,
      req.body.name.replace(/\s+/g, "") +
        "-" +
        uniqueSuffix +
        path.extname(file.originalname)
    );
  },
});

module.exports = multer({ storage: storage });
