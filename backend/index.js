const connectToMongo = require("./db");
const express = require("express");
const app = express();

connectToMongo();

app.use(express.json());

const port = 3001 || process.env.PORT;

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
