import express from "express";
import {authRoutes} from "./auth/auth.routes";


export const apiRoutes = express.Router();
apiRoutes
    .use('/auth', authRoutes);


