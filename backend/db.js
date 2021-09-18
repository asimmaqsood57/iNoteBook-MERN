const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/iNoteBook";

const connectToMongo = () => {
  mongoose
    .connect(mongooseURI)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToMongo;
