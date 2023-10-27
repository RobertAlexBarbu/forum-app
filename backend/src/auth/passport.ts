import pp from "passport";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";


export const passport = pp;
passport.use('local', new Strategy(async (username, password, done) => {
    try {
        const user = await AuthService.getUser(username);
        if (user === null) {
            return done(null, false);
        }

        const isPasswordValid = await AuthService.isPasswordValid(password, user.passwordHash as string, user.passwordSalt as string);
        if (isPasswordValid) {
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