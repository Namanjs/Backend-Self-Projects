import { Router } from "express";
import { signup, signUpAsAdmin, addTodos, getTodos, getTodoById } from '../Controllers/usercontroller.js'
import { isLoggedIn } from "../middlewares/isSignedIn.js";

const router = Router();

router.route("/signup").post(signup); // sign up the user

router.route("/signup/admin").post(signUpAsAdmin); // sign up the user as admin

router.route("/addtodo").post(isLoggedIn, addTodos); // checks if the user is signed in and if yes allow him/her to add todo

router.route("/gettodo").get(isLoggedIn, getTodos); // allows user to fetch all of his todos

router.route("/getTodoById").get(isLoggedIn, getTodoById); // get the todo by specific id

export default router;