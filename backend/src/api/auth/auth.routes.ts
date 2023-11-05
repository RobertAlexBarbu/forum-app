import express, {NextFunction} from "express";
import {passport} from "../../config/passport";
import {
  schemaValidationMiddleware
} from "../../middleware/schema-validation.middleware";

export const authRoutes = express.Router();

authRoutes.post(
  '/login',
  schemaValidationMiddleware('login'),
  passport.authenticate('local'),
  passport.session(),
  (req: express.Request, res: express.Response) => {
    console.log(req.user);
    res.send(req.user);
  }
)

authRoutes.post('/logout',
  (req: express.Request, res: express.Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send()
  });
})

authRoutes.get('/is-auth',
  (req: express.Request, res: express.Response) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(false);
  }
})
