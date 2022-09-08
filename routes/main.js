import express from "express"
import * as mainController from "../controllers/mainController.js"
import * as userController from "../controllers/userController.js"
const router = express.Router();

router.route('/').get(mainController.getIndexPage);
router.route('/about').get(mainController.getAboutPage);
router.route('/register').get(mainController.getRegisterPage);
router.route('/login').get(mainController.getLoginPage);

export default router;