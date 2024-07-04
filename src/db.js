import { connect } from "mongoose";
import { MONGODB_URI } from "./config"


export const connectMongoDb = async () => {
  // console.log("hola");
  try {
    await connect(MONGODB_URI);
    console.log("connected db");
  } catch (error) {
    console.log("error en bd");
    console.log(error);
  }

} 