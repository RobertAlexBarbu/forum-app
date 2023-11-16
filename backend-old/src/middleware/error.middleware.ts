import express from "express";

export const errorMiddleware: express.ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack || err.toString());
    res.statusCode = 500;
    res.statusMessage = err.message;
    res.send();
}