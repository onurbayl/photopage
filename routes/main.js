import express from "express"
import * as mainController from "../controllers/mainController.js"



const router = express.Router();

router.route('/').get(mainController.getIndexPage);
router.route('/about').get(mainController.getAboutPage);
router.route('/register').get(mainController.getRegisterPage);
router.route('/login').get(mainController.getLoginPage);
router.route('/logout').get(mainController.getLogOut);

export default router;