import express from "express";
import {sessionMiddleware} from "./middleware/session.middleware";
import {passport} from "./config/passport";
import {apiRoutes} from "./api/api.routes";
import cors from 'cors';
import {errorMiddleware} from "./middleware/error.middleware";

const app = express();

app.use(cors( {
    origin: ['http://localhost:4200', 'http://192.168.0.200:4200'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
} ));
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize(), passport.session())
app.use('/api', apiRoutes);
app.use(errorMiddleware);

app.listen(3000, '192.168.0.200', () => {
    console.log("Server is listening on port 3000");
})

