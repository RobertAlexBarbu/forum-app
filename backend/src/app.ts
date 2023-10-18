import dotenv from 'dotenv';
import express from "express";
import {sessionMiddleware} from "./sessionMiddleware";
import {database} from "./database/database";
import {DatabaseRepository} from "./database/DatabaseRepository";

dotenv.config();
const app = express();

const UsersRepository = new DatabaseRepository('users');

app.use(sessionMiddleware);
app.use(async (req, res, next) => {
    try {
    // const test = await UsersRepository.insert({
    //     username: 'Test3',
    //     passwordHash: 'TestHash3',
    //     salt: 'TestSalt3'
    // });
    const user = await UsersRepository.getByCol('username', 'Test5');
        console.log(user);
    } catch(err) {
        console.log(err);
    } finally {
        console.log("Request received");
        res.send('Hello world')
    }


})
app.listen(3000, 'localhost', () => {
    console.log("Server is running");
})