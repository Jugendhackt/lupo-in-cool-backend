const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser({limit: '10mb', parameterLimit: 1000000000}));
app.use(require('./routes/json'));
app.use(require('./routes/mdb'));

let serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
  console.log("Server listening on port: " + serverPort);
});
