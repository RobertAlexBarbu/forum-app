import express from "express";
import {userRoutes} from "./user/routes/userRoutes.js";


export const apiRoutes = express.Router();
apiRoutes.use('/users', userRoutes);


