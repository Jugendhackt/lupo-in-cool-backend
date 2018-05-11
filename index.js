const express = require('express');
const app = express();

app.use(require('./routes/json'));
app.use(require('./routes/mdb'));

let serverPort = process.env.PORT || 3000;
app.listen(serverPort, () => {
  console.log("Server listening on port: " + serverPort);
});
