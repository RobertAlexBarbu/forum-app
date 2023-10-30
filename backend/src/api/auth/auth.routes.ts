import express from "express";
import {passport} from "./passport";
import {AuthService} from "./auth.service";
import {
  schemaValidationMiddleware
} from "../../middleware/schema-validation.middleware";

export const authRoutes = express.Router();

authRoutes.post(
  '/login',
  schemaValidationMiddleware('login'),
  passport.authenticate('local'),
  passport.session(),
  (req, res) => {
    res.send(req.user);
  }
)

authRoutes.post(
  '/signup',
  schemaValidationMiddleware('signup'),
  async (req, res, next) => {
    try {
      const exists = await AuthService.userExists(req.body);
      if (exists) {
        res.statusCode = 400;
        res.statusMessage = "Username or email already exits";
        res.send();
      } else {
        await AuthService.saveSignup(req.body);
        next();
      }
    } catch (err) {
      next(err);
    }
  },
  passport.authenticate('local'),
  (req, res) => {
    res.send(req.user);
  }
)

authRoutes.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send()
  });
})

authRoutes.get('/is-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(false);
  }
})
