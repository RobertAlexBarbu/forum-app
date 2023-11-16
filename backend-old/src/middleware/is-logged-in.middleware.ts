import express from "express";

export const isLoggedInMiddleware: express.RequestHandler = (req, res, next) => {
  if(req.user === undefined) {
    res.status(401).send();
  } else {
    next();
  }
}