// user.repository.js
import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import {PEPPER_SECRET} from "../../config/env.js";

export default class UserRepository {

  // method for sign Up
  static async signUp({ name, email, password, role }) {
    try {
      const existingUser = users.find((u) => u.email === email);

      if (existingUser) {
        return { status: "EMAIL_ALREADY_REGISTERED" };
      }

      // hash password
      const hashPassword=await bcrypt.hash(password+PEPPER_SECRET,12);

      const newUser = new UserModel(
        Date.now().toString(),
        name,
        email,
        hashPassword,
        role
      );
      users.push(newUser);
      const {password:_,...safeUser}=newUser; // removes password from safeUser using rest operator
      return { status: "SUCCESS", newUser: safeUser };
    } catch (error) {
      console.error("SignUp Error: ",error);
      throw new Error("Error inserting user: "+error.message);
    }
  }

  // method for sign In
  static async signIn({ email, password }) {
    try {
      const user = users.find((u) => u.email === email);

      if (!user) {
        return { status: "USER_NOT_FOUND" };
      }

      // convert and compare hashed password using bcrypt compare
      const match=await bcrypt.compare(password+PEPPER_SECRET,user.password);

      if (!match) {
        return { status: "INCORRECT_PASSWORD" };
      }

      const {password: _ ,...safeUser}=user; // removing password using rest operator
      return { status: "SUCCESS", user: safeUser };      
    } catch (error) {
      throw new Error("Error logging user: "+error.message);
    }
  }
}

// sample user
var users = [
  new UserModel (
    '1756862084954',
    'user2',
    'user2@gmail.com',
    '$2b$12$C4JoHMgLfz8TqJiCMW5KU.F.K1v1usq1PdApO0pBtpQRW4TMowdpW', // user2Pass
    'customer'
  ),
];
