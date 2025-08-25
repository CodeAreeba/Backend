const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
type:{
    type:String,
    requried:true
},

},
{ timestamps: true }
)

const UserType = mongoose.model("UserType", userSchema);
module.exports = UserType;