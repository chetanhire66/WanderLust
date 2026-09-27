const User = require("../models/user.js");

module.exports.signupPage = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.loginPage = (req,res)=>{
    res.render("users/login.ejs"); 
};

module.exports.logoutPage = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        };
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
};

module.exports.signupPostRoute = async(req,res,next)=>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({email,username});
        const registerUser = await User.register(newUser, password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            };
            req.flash("success","user register successfully!");
            res.redirect("/listings");
        });
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.loginPostRoute = async(req,res)=>{
    req.flash("success","login successfully");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};