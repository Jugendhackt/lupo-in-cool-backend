const router = require("express").Router();
const mdb = require("mdb");

const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

router.post('/convert/json', upload.single('lupo'), (req, res) => {
  console.log(req);
  res.sendStatus(500);
});

module.exports = router;
