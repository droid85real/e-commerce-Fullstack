// user.controller.js
import UserRepository from "./user.repository.js";

export default class UserController {
  // sign Up middleware
  postSignUp(req, res) {
    const result = UserRepository.signUp(req.body);

    if (result.status === "EMAIL_ALREADY_REGISTERED") {
      return res.status(409).json({ error: "Email already registered" });
    } else if (result.status === "SUCCESS") {
      return res.status(201).json(result.newUser);
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  // sign In middleware
  postSignIn(req, res) {
    const result = UserRepository.signIn(req.body);

    if (result.status === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found" });
    } else if (result.status === "INCORRECT_PASSWORD") {
      return res.status(401).json({ error: "Incorrect password" });
    } else if (result.status === "SUCCESS") {
      return res.status(200).json(result.user);
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}
