import express from "express";
import {UsersService} from "./users.service";
import {
  schemaValidationMiddleware
} from "../../middleware/schema-validation.middleware";
import {passport} from "../../config/passport";


export const usersRoutes = express.Router();
usersRoutes.get('', UsersService.getAll)
usersRoutes.post(
  '',
  schemaValidationMiddleware('signup'),
  UsersService.signup,
  passport.authenticate('local'),
  (req: express.Request, res: express.Response) => {
    res.send(req.user);
  }
)