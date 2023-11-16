import express from "express";
import {SessionDataModel} from "../model/session-data.model";

export const isAdminMiddleware: express.RequestHandler = (
  req: express.Request,
  res: express.Response,
  next) => {
  const user = req.user as SessionDataModel;
  if (user === undefined ) {
    res.status(401).send();
  } else if(user.role !== 'admin') {
    res.status(401).send();
  } else {
    next();
  }
}