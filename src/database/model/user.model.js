import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "User Name is required"],
    trim: true,
    minlength: [ 3, "UserName must be at least 3 characters "],
    maxlength: [ 50,"UserName must be at most 50 characters" ],
  },
  email: {
    type: String,
    required: [true, "Emailrequired"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (val) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(val);
      },
      message: (props) => `${props.value} is an invalid email`,
    },
  },
  password: {
    type: String,
    validate:{
    validator:function (val){
      return /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(val)
    },
    message: (props) => `${props.value} is an invalid password`,
    },
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [100, "Password must be at most 100 characters"],
  },
  gender: {
    type: String,
    required:[true,"gender required"],
    enum:{
      values:["male","female"],
      message:"gender must be 'male'or 'female"
    },
  },
  phoneNumber: {
    type: String,
    required:[true,"phone is required"],
    trim:true
  },
  address: {
    type: String,
    default:"",
    trim:true,

  },
  bio: {
    type: String,
    default:"",
    maxlength:[400,"bio must to be at most 500 chars"]
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
      enum:{
      values:["User","admin"],
      message:"gender must be 'User'or 'admin"
    },
    default: "User",
  },
  dateofbirth:{
    type:Date,
  }
}, 
{ timestamps: true });

export const User = mongoose.model("User", userSchema);
