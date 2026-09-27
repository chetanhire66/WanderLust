if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Session
const session = require("express-session");

// MongoDB session store
const { MongoStore } = require("connect-mongo");

// Flash messages
const flash = require("connect-flash");

const ExpressError = require("./utils/ExpressError.js");

// HTTP method override
const methodOverride = require("method-override");

// EJS layouts
const ejsMate = require("ejs-mate");

// Authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


// MongoDB connection
const dbUrl = process.env.MONGODB_URI;

async function main() {
    await mongoose.connect(dbUrl);
}

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });


// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// Session configuration
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    // Store sessions in MongoDB
    store: MongoStore.create({
        mongoUrl: dbUrl,
        crypto: {
            secret: process.env.SESSION_SECRET
        },
        touchAfter: 24 * 3600
    }),

    // Cookie configuration
    cookie: {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));


// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Flash messages
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


// Make current user available in all EJS files
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    next();
});


// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// Home route
app.get("/", (req, res) => {
    res.redirect("/listings");
});


// 404 error handler
app.all("/{*splat}", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});


// Error handling middleware
app.use((err, req, res, next) => {
    let {
        statusCode = 500,
        message = "Something went wrong"
    } = err;

    res.status(statusCode).render("error.ejs", { message });
});


// Start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});