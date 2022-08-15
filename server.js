const {writeFile} = require("node:fs");
const {Buffer} = require("node:buffer");

const data = new Uint8Array(Buffer.from("This is just some made up text"));

writeFile("nextTextFile.txt", data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
