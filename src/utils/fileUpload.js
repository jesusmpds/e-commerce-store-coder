const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/images/products/");
  },
  filename: function (req, file, cb) {
    let splitType = file.mimetype;
    let fileSplit = splitType.split("/");
    const fileType = fileSplit[1];
    const uniqueSuffix = Date.now();
    cb(
      null,
      req.body.title.replace(/\s+/g, "") + "-" + uniqueSuffix + "." + fileType
    );
  },
});

module.exports = multer({ storage: storage });
