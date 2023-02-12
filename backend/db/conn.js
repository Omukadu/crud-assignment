const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/crud";
mongoose.set("strictQuery", true);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    
  })
  .then(() => {
    console.log("connected start");
  })
  .catch((err) => {
    console.log(err.message);
  });
