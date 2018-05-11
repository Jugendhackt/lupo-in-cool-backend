const router = require("express").Router();
const mdb = require("mdb");

const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

router.post('/convert/json', upload.single('lupo'), (req, res) => {
  console.log(req.file);
  console.log(req.files);
  res.sendStatus(200);
});

module.exports = router;
