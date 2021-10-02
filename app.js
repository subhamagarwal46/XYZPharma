const express = require("express");
const router = require("./Routes/router");

const app = express();
app.use(express.json());
app.use("/", router);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`App is listening in port ${port}`);
});
