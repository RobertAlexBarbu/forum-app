import express from "express";
import {usersRoutes} from "./users/users.routes";
import {authRoutes} from "../auth/auth.routes";


export const apiRoutes = express.Router();
apiRoutes
    .use('/users', usersRoutes);


