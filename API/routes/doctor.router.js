import express from 'express';
import * as DoctorController from '../controller/doctor.controller.js';

const router = express.Router();

router.post("/save", DoctorController.save);

router.post("/login",DoctorController.login);

router.get("/fetch", DoctorController.fetch);

router.patch("/update",DoctorController.updateDoctor);

router.delete("/delete",DoctorController.deleteDoctor);

export default router;

