# JWT-Auth
A complete Node.js application with MongoDB integration and secure JWT-based authentication. This project includes user registration, login, protected routes, and follows best practices for building secure and scalable REST APIs.

---

##  Features

- User registration & login
- JWT-based authentication
- Password hashing with bcrypt
- MongoDB for persistent storage
- RESTful API design with Express.js
- Secure protected routes

---


##  Installation

```bash
git clone https://github.com/yourusername/jwt-auth-app.git
cd jwt-auth-app
npm install
```

---

##  Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jwtapp
JWT_SECRET=your_jwt_secret
```

---

##  Run the App

```bash
npm start
```

Server will run at `http://localhost:5000`.

---

###  Public Routes

- **POST** `/api/register`  
  - Body: `{ "name": "John", "email": "john@example.com", "password": "123456" }`

- **POST** `/api/login`  
  - Body: `{ "email": "john@example.com", "password": "123456" }`
  - Returns: JWT token

---

###  Protected Route (Requires JWT)

- **GET** `/api/protected`
  - Headers: `{ Authorization: "Bearer <token>" }`
  - Returns: Protected content

---

##  Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- dotenv for environment variables

---

##  Security Notes

- Never expose JWT secrets or credentials in version control.
- Use HTTPS in production.
- Tokens should be stored securely (e.g., HttpOnly cookies or secure storage in frontend).
