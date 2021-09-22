const connectToMongo = require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
connectToMongo();

app.use(express.json());
app.use(cors());

const port = 3001 || process.env.PORT;

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNoteBook App listening at http://localhost:${port}`);
});
