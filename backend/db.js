const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/inotebook?readPreference=primary&ssl=false&directConnection=true&appname=MongoDB%20Compass";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};
module.exports = connectToMongo;
