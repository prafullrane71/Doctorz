import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();

// To link routes
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import DoctorRouter from './routes/doctor.router.js'

//to extract body data from request (POST , PUT , DELETE , PATCH)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// To extract file data from req
app.use(fileUpload());

// To resolve cross origin problem
app.use(cors());

// route level middleware
app.use("/user", UserRouter);
app.use("/category",CategoryRouter);
app.use("/doctor",DoctorRouter)

app.listen(3001);
console.log("server invoked at link http://localhost:3001");