import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import usersManager from "../data/mongo/managers/UsersManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";

import { createToken, verifyToken } from "../utils/token.util.js";
passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                if (!email || !password) {
                    const error = new Error("Please enter email and password!");
                    error.statusCode = 401;
                    return done(null, null, error)
                }

                const one = await usersManager.readByEmail(email);
                if (one) {
                    const error = new Error("Bad auth from register!");
                    error.statusCode = 401;
                    throw error;
                }
                const hashPassword = createHash(password)
                req.body.password = hashPassword
                const user = await usersManager.create(req.body)
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                const one = await usersManager.readByEmail(email);
                if (!one) {
                    const error = new Error("Bad auth from login!");
                    error.statusCode = 401;
                    return done(error)
                }
                const verify = verifyHash(password, one.password)
                if (verify) {
                    // req.session.email = email
                    // req.session.online = true
                    // req.session.role = one.role
                    // req.session.photo = one.photo
                    // req.session.user_id = one._id
                    const user = {
                        email,
                        role: one.role,
                        photo: one.photo,
                        _id: one._id,
                        online: true
                    }
                    const token = createToken(user)
                    user.token = token
                    return done(null, user)
                }
                const error = new Error("Invalid credentials");
                error.statusCode = 401;
                return done(error)
            } catch (error) {
                return done(error)
            }
        }
    )
)


passport.use(
    "jwt",
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),
            secretOrKey: process.env.SECRET_JWT
        }, (data, done) => {
            try {
                if (data) {
                    return done(null, data)
                } else {
                    const error = new Error("Forbidden from jwt!");
                    error.statusCode = 403;
                    return done(error)
                }

            } catch (error) {
                return done()
            }
        })
)
export default passport