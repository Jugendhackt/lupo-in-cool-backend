const router = require("express").Router();

const upload = require("../../upload");

router.post('/convert/mdb', upload.single('lupo'), (req, res) => {

});

module.exports = router;
