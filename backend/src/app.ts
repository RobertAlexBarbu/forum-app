import express from "express";
import {sessionMiddleware} from "./session/sessionMiddleware";
import {DatabaseRepository} from "./database/DatabaseRepository";

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
    const user = await UsersRepository.getByCol('username', 'Test3');
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