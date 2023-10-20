import express from "express";
import {DatabaseRepository} from "../../../db/DatabaseRepository.js";

const users = new DatabaseRepository('users');
export const userRoutes = express.Router();
userRoutes.get("/", async (req, res) => {
    const user = await users.getByCol('username', 'testUser1', 'username', 'email');
    res.send(user);
})