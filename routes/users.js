import express from "express"
import * as userController from "../controllers/userController.js"
import * as authMiddlewares from "../middlewares/authMiddleware.js"

const router = express.Router();


router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/dashboard').get(authMiddlewares.authenticateToken, userController.getDashboardPage);
router.route('/').get(userController.getAllUsers);
router.route('/:id').get(authMiddlewares.authenticateToken, userController.getAUser);
router.route('/:id/follow').put(authMiddlewares.authenticateToken, userController.follow);
router.route('/:id/unfollow').put(authMiddlewares.authenticateToken, userController.unfollow);

export default router;