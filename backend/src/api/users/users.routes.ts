import express from "express";
import {DatabaseRepository} from "../../db/database.repository";
import {UsersService} from "./users.service";
import {use} from "passport";

export const usersRoutes = express.Router();
usersRoutes.get('', async (req, res, next) => {
  try {
    const users = await UsersService.getAll();
    res.send(users);
  } catch (err) {
    next(err);
  }

})