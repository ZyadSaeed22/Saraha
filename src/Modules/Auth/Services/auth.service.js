import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { User } from "../../../database/model/user.model.js";

export const signup = async (req, res) => {
  try {
    const {
    userName, 
    email, 
    password,
    phoneNumber,
    gender, 
    confirmPassword, 
    address, 
    bio } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password dont match" });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); //هيشت الباسورد والسالت بتاعى عشره
    const encryptedPhone = CryptoJS.AES.encrypt(phoneNumber,"phoneNumber-secret-key").toString(); // دول حفظ
    const encryptedAddress = CryptoJS.AES.encrypt(address, 'toString()').toString();  // دول حفظ

    const user = new User({
      userName,
      email,
      password: hashedPassword, //بخزن الباسورد ال اتهيش ال هو اصلا ف السكيما 
      phoneNumber: encryptedPhone,
      gender,
      address: encryptedAddress,
      bio,
    });

    await user.save();
    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    return res.status(500).json({ status: "Internal Server Error",message:error.message,stack:error.stack });
  }
};



export const login = async (req , res)=>{
try{

  const {email,password}=req.body;
  const user = await User.findOne({ email });
  if(!user){
   return res.status(404).json({message:"user not found"});
  }

  const passmatch=bcrypt.compareSync(password,user.password);
  if(!passmatch){
   return res.status(404).json({message:"user not found"});
  }

  const decryptedPhoneNumber=CryptoJS.AES.decrypt(
    user.phoneNumber,
    "phoneNumber-secret-key"
  ).toString(CryptoJS.enc.Utf8);
  const decryptedAddress=CryptoJS.AES.decrypt(
    user.address,
    "Address-secret-key"
  ).toString(CryptoJS.enc.Utf8);
  user.phoneNumber=decryptedPhoneNumber;
  user.address=decryptedAddress;
  const userToken=jwt.sign({id :user._id,name:user.userName,email:user.email},"jwt-secret-key",{


  });
  res.status(200).json({message:"logged success",userToken});

}catch(error){
return res.status(500).json({
  status:"internal server error",
  message:error.message,
  stack:error.stack,
});
}


}