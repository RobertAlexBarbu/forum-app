import express from "express";
import {authRoutes} from "./auth/auth.routes";
import {forumsRoutes} from "./forums/forums.routes";


export const apiRoutes = express.Router();
apiRoutes
    .use('/auth', authRoutes)
    .use('/forums', forumsRoutes)

