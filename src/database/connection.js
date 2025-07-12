  import mongoose from "mongoose";

  const connection =async () => {
    try{
      await mongoose.connect(
        "mongodb://localhost:27017/saraha",
    // {
    //   serverSelectionTimeoutMS:30000,
    // }
    );
      console.log("Connected to MongoDB");

    } catch(err) {
     console.log(`something wrong${err}`);

    }
  };
  

  export default connection;