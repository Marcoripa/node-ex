const app = require("./app");

const config = require("./config")
require("dotenv").config();

app.listen(config.PORT, () =>
  console.log(`Server is listening on port: ${config.PORT}`)
);
