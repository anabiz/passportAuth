const mongoose = require("mongoose");


mongoose
  .connect("mongodb://localhost:27017/passport", { useUnifiedTopology: true })
  .then(() => console.log("i am in for passport"))
    .catch(() => console.error("unable to connect to passport"));
  


// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: String
});


const User = mongoose.model('user', UserSchema);

// Expose the connection
module.exports = User;


