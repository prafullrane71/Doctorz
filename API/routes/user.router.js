import express from 'express';
import * as UserController from '../controller/user.controller.js';

const router = express.Router();

router.post("/save", UserController.save);

router.post("/login",UserController.login);

router.get("/fetch", UserController.fetch);

router.patch("/update",UserController.updateUser);

router.delete("/delete",UserController.deleteUser);

export default router;
