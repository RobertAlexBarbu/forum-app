import pp from "passport";
import {Strategy} from "passport-local";
import {CryptoService} from "../services/crypto.service";
import {db} from "../db/db";

export const passport = pp;
passport.use('local', new Strategy(async (username, password, done) => {
  try {
    const user = await getAuthData(username);
    if (user === null) {
      return done(null, false);
    }
    const password_hash = await CryptoService.hash(password, user.password_salt);
    if (password_hash === user.password_hash) {
      return done(null, {
        username: user.username,
        id: user.id,
        role: user.role
      });
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
}));
const getAuthData = async (usernameOrEmail: string) => {
  const result = await db('users')
    .join('roles', 'users.role_id', 'roles.id')
    .select('users.id',
      'username',
      'password_hash',
      'password_salt',
      'role')
    .where('username', usernameOrEmail)
    .orWhere('email', usernameOrEmail);
  if (result.length === 0) {
    return null;
  }
  return result[0];
}
passport.serializeUser(function (user: any, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      role: user.role
    });
  });
});
passport.deserializeUser(function (user: any, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});