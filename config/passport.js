const app = require("../app");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./database");
const { validPassword } = require("../lib/passwordUtils");

console.log("i am passport local");
const customField = {
    usernameField: 'uname',
    passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {
    //console.log(req.body);
    console.log(username);
    console.log(password);
    User.findOne({ username: username }) 
        .then((user) => {
            //console.log(user);
            if (!user) {
                return done(null, false)
            }
            const isValid = validPassword(password, user.hash, user.salt);
            if (isValid) {
                console.log(isValid)
                return done(null, user);
            } else {
                console.log(isValid)
                return done(null, false)
            }
        })
        .catch((err) => {
        done(err)
    })
}
const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    console.log("ohhhhhhhhhhhhhhhh");
    try {
         done(null, user.id);
    } catch (error) {
        console.log(error)
    }
   
})

passport.deserializeUser((id, done) => {
    console.log("owwwwwwwwwwwwwwwwwww");
    console.log(id);
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

