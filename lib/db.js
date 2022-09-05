const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection.on("connected", function () {
    console.log("connected to db");
  });
  mongoose.connection.on("error", function (err) {
    console.log("connection failed");
  });
};
