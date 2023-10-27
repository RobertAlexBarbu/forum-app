import express from "express";
import {sessionMiddleware} from "./middleware/session.middleware";
import {passport} from "./auth/passport";
import {apiRoutes} from "./api/api.routes";
import cors from 'cors';
import {authRoutes} from "./auth/auth.routes";
import {errorMiddleware} from "./middleware/error.middleware";

const app = express();

app.use(cors( {
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
} ));
app.use(express.json());
app.use(sessionMiddleware);
app.use(passport.initialize(), passport.session())
app.use('/api', apiRoutes);
app.use('/auth', authRoutes)
app.use(errorMiddleware);

app.listen(3000, 'localhost', () => {
    console.log("Server is listening on port ");
})

