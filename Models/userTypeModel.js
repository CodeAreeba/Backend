const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
type:{
    type:String,
    required:true
},

},
{ timestamps: true }
)

const UserType = mongoose.model("UserType", userSchema);
module.exports = UserType;