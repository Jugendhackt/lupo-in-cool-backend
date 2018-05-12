const fs = require('fs');
const arc4 = require('arc4');
const headerCipher = arc4('arc4', 0x6b39dac7.toString());

// useful shit
function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

function toBuffer(ab) {
  var buf = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}

// ---

function readFile(file) {
  return new Promise(((resolve, reject) => {
    fs.readFile(file, {}, (error,  data) => {
      if (error) reject(error);
      resolve(data);
    });
  }));
}

function decrypt(file, key) {
  let jetFile = null;
  readFile(file).then((data) => {
    jetFile = Buffer.from(data);
    if (data.readUInt32LE() !== 0x100) {
      console.log("ERROR - File is not an mdb file");
      throw new Error("Error - File is not an mdb file");
    }
    console.log("File format ID: " + data.toString("utf8", 4, 4 + 16));
    let version = "";
    let jetVersion = -1;

    switch(data.readUInt32LE(0x14)) {
      case 0:
        version = "Access 97 (Jet 3)";
        jetVersion = 3;
        break;
      case 1:
        version = "Access 2000, 2002/3 (Jet 4)";
        jetVersion = 4;
        break;
      case 2:
        version = "Access 2007 (Jet 4)";
        jetVersion = 4;
        break;
      case 0x103:
        version = "Access 2010 (Jet 4)";
        jetVersion = 4;
        break;
      default:
        version = "Unknown version: " + data.readUInt32LE(0x14);
        break;
    }

    console.log("Access version: " + version);

    if (jetVersion === -1) {
      console.log("Invalid/unknown jet version!");
      throw new Error("Invalid/unknown jet version!");
    }

    let headerLength = (jetVersion === 4) ? 128 : 126;

    let headerEncrypted = new Buffer(headerLength);
    data.copy(headerEncrypted, 0x18, headerLength);

    let headerDecrypted = headerCipher.decodeBuffer(headerEncrypted);

    console.log(headerEncrypted);
    console.log(headerDecrypted);
    console.log(headerDecrypted.readUInt32LE(0x26));
    console.log(headerDecrypted.toString('hex', 0x2A, 40));
    console.log(headerDecrypted.readDoubleLE(0x5A));
  })
}

function encrypt(file, key) {

}

module.exports = {
  decrypt: decrypt,
  encrypt: encrypt
};
