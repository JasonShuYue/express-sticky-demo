var passport = require('passport');
var express = require('express');
var GitHubStrategy = require('passport-github').Strategy;
var router = express.Router();


passport.serializeUser(function(user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('---deserializeUser---')
    console.log(obj)
    done(null, obj);
});

passport.use(new GitHubStrategy({
        clientID: '64b7b326131bba52dc3e',
        clientSecret: '9dbef840320186c8c838c62756f70f63adf06152',
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
        done(null, profile);
    }
));


router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        console.log('success!!!!!!!!!!!!!!!!!!!!!')
        console.log(req.user)
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        res.redirect('/');
    });

module.exports = router;