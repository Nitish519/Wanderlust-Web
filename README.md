# 🌍 Wanderlust

A full-stack Airbnb-inspired web application where users can discover, list, and review travel destinations. Built with Node.js, Express, MongoDB, and EJS.

---

## ✨ Features

- 🏠 **Listings** — Create, view, edit, and delete property listings with image uploads
- ⭐ **Reviews** — Authenticated users can post and delete reviews with star ratings
- 🔐 **Authentication** — Secure sign up / login via Passport.js with local strategy
- 🖼️ **Image Uploads** — Cloud storage via Cloudinary with Multer middleware
- 🛡️ **Authorization** — Only listing owners can edit/delete their listings; only review authors can delete their reviews
- 💬 **Flash Messages** — User feedback on key actions (login, create, delete, etc.)
- ✅ **Server-side Validation** — Joi schema validation for listings and reviews
- 🎨 **Templating** — EJS with ejs-mate for layout inheritance

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Templating | EJS + ejs-mate |
| Authentication | Passport.js (LocalStrategy) |
| Image Storage | Cloudinary + Multer |
| Validation | Joi |
| Sessions | express-session + connect-flash |

---

## 📁 Project Structure


```
wanderlust/
├── models/
│   ├── listing.js       # Listing Mongoose model
│   ├── review.js        # Review Mongoose model
│   └── user.js          # User model (passport-local-mongoose)
├── routes/
│   ├── listing.js       # Listing CRUD routes
│   ├── review.js        # Review routes
│   └── user.js          # Auth routes (signup/login/logout)
├── controllers/         # Route handler logic
├── views/
│   ├── listings/        # Listing EJS templates
│   ├── users/           # Auth EJS templates
│   └── error.ejs        # Error page
├── public/              # Static assets (CSS, JS, images)
├── utils/
│   ├── wrapAsync.js     # Async error wrapper
│   └── ExpressError.js  # Custom error class
├── middleware.js         # isLoggedIn, isOwner, validateReview, etc.
├── schema.js            # Joi validation schemas
├── cloudinary.js        # Cloudinary + Multer config
├── app.js               # Express app entry point
└── .env                 # Environment variables (not committed)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally or a cloud URI
- A [Cloudinary](https://cloudinary.com/) account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the app**
   ```bash
   node app.js
   ```

6. Open your browser and visit `http://localhost:8080`

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `SECRET` | Session secret key |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## 📸 Screenshots

> _Add screenshots of your app here once deployed_

---

## 🌐 Deployment

This project can be deployed on platforms like [Render](https://render.com) or [Railway](https://railway.app). Make sure to:

- Set all environment variables in your platform's dashboard
- Use a cloud MongoDB URI (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))
- Ensure Cloudinary credentials are correctly configured


---

> Built with ❤️ as a full-stack learning project inspired by Airbnb.
