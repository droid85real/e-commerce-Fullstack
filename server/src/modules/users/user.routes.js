// user.routes.js
import express from "express";
import UserController from "./user.controller.js";
import UserRepository from "./user.repository.js";

const userRoutes=express.Router(); // initializing express server

// creating instance of UserRepository
const userRepository=new UserRepository();

// creating instance of UserController
const userController=new UserController(userRepository); // injecting UserRepository


/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Creates a new user account in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *               role:
 *                 type: string
 *                 example: customer
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */
userRoutes.post(
    "/signup", // http:localhost:3000/api/users/signup
    userController.postSignUp
);

/**
 * @swagger
 * /api/users/signin:
 *   post:
 *     summary: Authenticate user
 *     tags: [Users]
 *     description: Logs in a user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 65f1c7a9e7d8c1a123456789
 *                 role:
 *                   type: string
 *                   example: customer
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoutes.post(
    "/signin",// http://localhost:3000/api/users/signin
    userController.postSignIn
);

export default userRoutes;