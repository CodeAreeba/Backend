const User = require("../Models/userModel");
const UserType = require("../Models/userTypeModel");

const createuser = async (req, res) => {
  const { name, email, password,typeid } = req.body;
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
   if (!typeid) {
    return res.json({
      error: "typeid is required",
    });
  }
  try {
    const userexist = await User.findOne({ email: email });
    if (userexist) {
      return res.json({
        error: "Already exist",
      });
    }
      const typeexist = await UserType.findOne({_id:typeid});
    if (!typeexist) {
      return res.json({
        error: " UserType not exist",
      });
    }
    const usercreated = await User.create({
      name,
      email,
      password,
      usertype:{_id:typeid}
    });
       

    return res.json({
      status: 200,
      message: "User Created",
      data: usercreated,
    });
  } catch (error) {}
  //   const { name, father, email, phone, password, username } = req.body;
};
const createusertype = async (req, res) => {
  const {name} = req.body;
  if (!name) {
    return res.json({
      error: "Name is required",
    });
  }
 
  try {
    const usertypeexist = await UserType.findOne({type:name});
    if (usertypeexist) {
      return res.json({
        error: "Already exist",
      });
    }

    const usercreated = await UserType.create({
     type:name
    });

    return res.json({
      status: 200,
      message: "UserType Created",
      data: usercreated,
    });
  } catch (error) {}
  //   const { name, father, email, phone, password, username } = req.body;
};
const getuserlist = async (req, res) => {
  const userlist = await User.find()
    .select("email -_id")
    .populate({
      path: "usertype._id",
      model:"UserType"
    })
    .sort({ createdAt: -1 });
  const listlength = await User.countDocuments();
  return res.json({
    status: 200,
    lenght: listlength,
    message: "List fetched Successfully",
    data: userlist,
  });
};
const getsingleuser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
 
  return res.json({
    status: 200,
    message: "User fetched Successfully",
    data: user,
    token: await user.generateToken()
  });
};

// const updateuser = async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   if (!name) {
//     return res.json({
//       error: "Name is required",
//     });
//   }
//   const user = await User.find({ _id: id });

//   // user.name = name;
//   //    const updatedUser = await user.save();
//   // await user.save();

// //  const response = await User.findOneAndUpdate({_id:id , name:name})

//   return res.json({
//     status: 200,
//     message: "User updated Successfully",
//     data:user
  
//   });
// };

const updateuser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }

    // Step 1: Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Step 2: Update the field(s)
    user.name = name;

    // Step 3: Save the updated user
    const updatedUser = await user.save();

    return res.json({
      status: 200,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
 await User.findByIdAndDelete(id);


    return res.json({
      status: 200,
      message: "User deleted successfully",
     
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { createuser, getuserlist, getsingleuser, updateuser ,deleteuser,createusertype};
