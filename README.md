# 🌍 WanderLust — Full-Stack Travel Listing Platform

WanderLust is a **production-style full-stack travel listing web application** where users can discover, create, review, and manage travel accommodation listings.

Built using **Node.js, Express.js, MongoDB Atlas, Passport.js, Cloudinary, and EJS**, the application focuses on secure authentication, authorization, cloud media storage, and scalable backend architecture.

🔗 **Live Demo:** https://wanderlust-msz6.onrender.com  
🔗 **GitHub Repository:** https://github.com/Nitish519/Wanderlust-Web

---

## ✨ Core Features

### 🏠 Listing Management
- Create, edit, view, and delete travel listings
- Multi-image upload support for listings
- Cloud-based image storage

### 🔐 Authentication & Authorization
- Secure **sign up / login** using **Passport.js (Local Strategy)**
- Session-based authentication
- Password hashing & salting using `passport-local-mongoose`
- **Role-based authorization**
  - Only listing owners can edit/delete listings
  - Only review authors can delete reviews

### ⭐ Review System
- Add and delete reviews with ratings
- Dynamic average rating calculation
- Review ownership validation

### 🔍 Discovery Features
- Search listings by destination
- Category-based filtering
- Budget/price filtering

### ☁️ Cloud Integration
- **Cloudinary + Multer** for image upload, storage, and deletion
- **MongoDB Atlas** for cloud-hosted database management

### 🛡️ Reliability & Validation
- **Joi server-side validation**
- Reusable middleware architecture
- Centralized error handling
- Async route error wrapping

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | Passport.js + passport-local-mongoose |
| Templating Engine | EJS + ejs-mate |
| Image Storage | Cloudinary + Multer |
| Validation | Joi |
| Session Management | express-session |
| User Feedback | connect-flash |
| Deployment | Render |

---

## 🏗️ Architecture & Design Decisions

### MVC Architecture

The application follows the **Model–View–Controller (MVC)** pattern for maintainable and scalable code organization.

```txt
Models → Database logic
Views → EJS frontend templates
Controllers → Business logic
Routes → API/request handling
Middleware → Authorization & validation
```

### Security Measures

- Session-based authentication
- Password hashing & salting
- Authorization middleware for protected actions
- Server-side request validation
- Environment variable protection using `.env`

---

## 📁 Project Structure

```txt
wanderlust/
│── models/          # Mongoose schemas
│── controllers/     # Business logic
│── routes/          # Express routes
│── views/           # EJS templates
│── public/          # Static assets
│── middleware.js    # Auth & validation middleware
│── schema.js        # Joi schemas
│── cloudinary.js    # Cloudinary config
│── app.js           # Application entry point
```

---

## 🚀 Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/Nitish519/Wanderlust-Web.git
cd Wanderlust-Web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the Application

```bash
npm start
```

Visit:

```txt
http://localhost:8080
```

---

## 🌐 Deployment

The application is deployed using:

- **Render** → Backend hosting
- **MongoDB Atlas** → Cloud database
- **Cloudinary** → Image storage

Production configuration is managed through **environment variables**.

---

## 📸 Screenshots

_Add screenshots here after deployment_

Suggested screenshots:

- Home Page
- Listing Details Page
- Create Listing Page
- Login / Signup Page
- Reviews Section

---

## 🔮 Future Improvements

- Interactive map integration
- Pagination / lazy loading
- Wishlist / favorites
- Booking functionality
- Advanced filters

---

## 👨‍💻 Author

**Nitish Bairwa**

Built as a **full-stack web development project** focusing on backend architecture, authentication, authorization, cloud integration, and scalable application design.