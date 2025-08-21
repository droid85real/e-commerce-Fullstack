// user.repository.js
import UserModel from "./user.model.js";

export default class UserRepository {
  // method for sign Up
  static signUp({ name, email, password, role }) {
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return { status: "EMAIL_ALREADY_REGISTERED" };
    }

    const newUser = new UserModel(
      Date.now().toString(),
      name,
      email,
      password,
      role
    );
    users.push(newUser);
    return { status: "SUCCESS", newUser };
  }

  // method for sign In
  static signIn({ email, password }) {
    const user = users.find((u) => u.email === email);

    if (!user) {
      return { status: "USER_NOT_FOUND" };
    }

    if (user.password !== password) {
      return { status: "INCORRECT_PASSWORD" };
    }

    return { status: "SUCCESS", user };
  }
}

// sample user
var users = [
  new UserModel(1, "user1", "user1@gmail.com", "user1pass", "customer"),
];
