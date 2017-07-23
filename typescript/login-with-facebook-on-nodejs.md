---
title: "Login with Facebook on NodeJS"
tags: [facebook, node.js, oauth, typescript]
---

There is an easy way on NodeJS to handle logins with Facebook, Google, LinkedIn, Twitter and so on, you can use <a href="http://passportjs.org/" target="_blank">passport</a>.

[code]npm i passport --save[/code]
[code]npm i passport-facebook --save[/code]
<!--more-->

To use it:

[code language="javascript"]
import passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
[/code]

Then you have to configure the provider:

[code language="javascript"]
passport.use(new FacebookStrategy({
    clientID: oauthSettings.FacebookID,
    clientSecret: oauthSettings.FacebookSecret,
    callbackURL: "http://localhost:1337/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done)
    {
        // you email, name, id, and so on is on profile
        var result = profile;
    }
));
[/code]

You can get a clientID and clientSecret by going to <a href="https://developers.facebook.com/" target="_blank">developers.facebook.com</a>. Add a platform on your application and on the website enter "localhost:1337".

You also have to configure two routes, one to trigger the login and the other one what you specified on the callbackURL above to handle the return result from Facebook.

[code language="javascript"]
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
[/code]

Start your application on localhost:1337 and you are good to go, it should work.

You can also watch this video that shows how to accomplish it:
http://www.youtube.com/watch?v=7olUoVw_s9M
