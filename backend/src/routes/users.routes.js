// import { Router } from "express";
// import {login , register} from "../controllers/user.controler.js"
// const router=Router();

// router.route("/login").post(login);
// router.route("/register").post(register);
// router.route("/add_to_activity");
// router.route("/get_all_activity");

// export default router;

import { Router } from "express";
import {
    login,
    register,
    addToHistory,
    getUserHistory
} from "../controllers/user.controler.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/add_to_activity", addToHistory);
router.get("/get_all_activity", getUserHistory);

export default router;