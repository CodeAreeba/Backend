const User = require("../Models/userModel");

const createuser = async (req, res) => {
  const { name, email , password } = req.body;
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
   if (!email) {
    return res.json({
      error: "email is required",
    });
  }
   if (!password) {
    return res.json({
      error: "password is required",
    });
  }
try{
const userexist= await User.findOne({email:email})
  if (userexist) {
    return res.json({
      error: "Already exist",
    });
  }
  const usercreated= await User.create({
    name, email , password 
  })

  return res.json({
    status:200,
    message:"User Created",
    data:usercreated
  })
}
catch(error){

}


  //   const { name, father, email, phone, password, username } = req.body;

};


const getuserlist = async (req, res) => {
const userlist= await User.find().select("email -_id").sort({createdAt:-1});
const listlength= await User.countDocuments();
  return res.json({
    status:200,
    lenght:listlength,
    message:"List fetched Successfully",
    data:userlist
  })
} 
const getsingleuser = async (req, res) => {
  const {id}=req.params;
const user= await User.find({_id:id});
  return res.json({
    status:200,
    message:"User fetched Successfully",
    data:user
  })
} 

module.exports = { createuser,getuserlist,getsingleuser };
