import { Router } from "express";
import { signup, signUpAsAdmin, addTodos } from '../Controllers/usercontroller.js'
import { isLoggedIn } from "../middlewares/isSignedIn.js";

const router = Router();

router.route("/signup").post(signup); // sign up the user

router.route("/signup/admin").post(signUpAsAdmin); // sign up the user as admin

router.route("/addtodo").post(isLoggedIn, addTodos); // checks if the user is signed in and if yes allow him/her to add todo

export default router;