# 🌍 WanderLust

WanderLust is a full-stack travel and property listing web application where users can explore listings, create their own listings, upload images, add reviews, and manage their accounts.

The project is built using Node.js, Express.js, MongoDB, EJS, Passport.js, Cloudinary, and Mapbox.

## 🚀 Features

- 👤 User Signup and Login
- 🔐 User Authentication using Passport.js
- 🏠 Create, View, Edit and Delete Listings
- 🖼️ Upload Listing Images using Cloudinary
- 📍 Location-based listings using Mapbox
- 🗺️ Interactive Map for Listings
- ⭐ Add Ratings and Reviews
- ✏️ Edit and Delete Reviews
- 🔒 Authorization for Listing Owners
- 🔒 Authorization for Review Authors
- 💬 Flash Messages for User Feedback
- 🛡️ Server-side Validation using Joi
- 📱 Responsive UI using Bootstrap
- 🍪 Session-based Authentication
- ☁️ MongoDB Session Storage using Connect-Mongo
- 🚨 Custom Error Handling

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS
- EJS-Mate
- Bootstrap
- Starability CSS

### Backend
- Node.js
- Express.js
- Express Session
- Passport.js
- Passport Local
- Passport Local Mongoose

### Database
- MongoDB
- Mongoose
- MongoDB Atlas

### APIs & Services
- Mapbox
- Cloudinary

### Validation & Middleware
- Joi
- Multer
- Method Override
- Connect Flash
- Connect Mongo

## 📂 Project Structure

```text
WanderLust/
│
├── controllers/
│   ├── listings.js
│   ├── review.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── reviews.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   ├── users/
│   └── error.ejs
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
└── .gitignore
