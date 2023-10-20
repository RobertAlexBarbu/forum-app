import express from "express";
import {sessionMiddleware} from "./auth/session/sessionMiddleware.js";
import {passport} from "./auth/passport/passport";
import {apiRoutes} from "./api/apiRoutes";

const app = express();

app.use(sessionMiddleware);
app.use(passport.initialize(), passport.session())
app.use('/api', apiRoutes);

app.listen(3000, 'localhost', () => {
    console.log("Server is listening on port ");
})