const multer = require('multer');
const upload = multer({dest: '/tmp/upload'});

module.exports = upload;
