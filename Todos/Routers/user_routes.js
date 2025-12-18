import { Router } from "express";
import { signup } from '../Controllers/usercontroller/js'

const router = Router();

router.route("/singup").post(signup);