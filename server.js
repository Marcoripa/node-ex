// const {writeFile} = require("node:fs");
// const {Buffer} = require("node:buffer");

// const data = new Uint8Array(Buffer.from("This is just some made up text"));

// writeFile("nextTextFile.txt", data, (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });

function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

luckyDraw("Jon")
  .then(message => console.log(message))
  .catch(message => console.log(message))
  .then(
    luckyDraw("Caroline")
      .then(message =>  console.log(message))
      .catch(message => console.log(message))
  )
  .then(
    luckyDraw("Sabrina")
      .then(message => console.log(message))
      .catch(message => console.log(message))
  );
