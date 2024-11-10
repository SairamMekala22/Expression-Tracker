// import mongoose from "mongoose";
// mongoose.connect("mongodb+srv://netninja:test1234@nodetuts.hr0cn.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts")
// .then(()=>{
//     console.log("mongodb connected");
// })
// .catch(()=>{
//     console.log('failed');
// })


// const newSchema=new mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// const collection = mongoose.model("collection",newSchema)

// export default collection;

import mongoose from "mongoose";

// MongoDB connection
mongoose.connect("mongodb+srv://pindira2006:Indira@cluster0.at9ct.mongodb.net/indira_mongo?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log('failed');
  });

// User schema
const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiry: Date
});

const collection = mongoose.model("User", newSchema); // Change to "User" for clarity

export default collection;
