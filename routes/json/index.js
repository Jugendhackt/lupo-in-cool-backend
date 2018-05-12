const router = require("express").Router();
const mdb = require("mdb");
const csvParse = require("csv-parse");

const upload = require('../../upload');

router.post('/convert/json', upload.single('lupo'), (req, res) => {
  const mdbFile = mdb(req.file.path);
  console.log(mdbFile);
  let result = {};

  mdbFile.tables((err, tables) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    }
    else {
      tables.forEach((table) => {
        mdbFile.toCSV(table, (err, csv) => {
          if (err) {
            throw err;
          }

          csvParse(csv, {columns: true}, (err, output) => {
            if (err) {
              throw err;
            }

            result[table] = output;
            if (Object.keys(result).length === tables.length) {
              res.send(result);
            }
          });
        });
      });
    }
  });
});

module.exports = router;
