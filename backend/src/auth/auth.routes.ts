import express from "express";
import {passport} from "./passport";
import {AuthService} from "./auth.service";
import {
  schemaValidationMiddleware
} from "../middleware/schema-validation.middleware";
import {isLoggedInMiddleware} from "../middleware/is-logged-in.middleware";

export const authRoutes = express.Router();
authRoutes
  .post(
    '/login',
    schemaValidationMiddleware('login'),
    passport.authenticate('local'),
    passport.session(),
    (req, res) => {
      res.send(req.user);
    }
  )
  .post(
    '/signup',
    schemaValidationMiddleware('signup'),
    async (req, res, next) => {
      try {
        await AuthService.saveSignup(req.body);
        next();
      } catch (err) {
        next(err);
      }
    },
    passport.authenticate('local'),
    (req, res) => {
      res.send(req.user);
    }
  )// needs to be post
  .get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.send()
    });
  })
  .get('/is-auth', (req, res) => {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.send(false);
    }
  })
