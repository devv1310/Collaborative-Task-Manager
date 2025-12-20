🧑‍💻 Collaborative Task Manager

Full-Stack Engineering Assessment

🚀 Live Demo

Frontend (Vercel):
https://collaborative-task-manager-lgdj.vercel.app/

Backend API (Render):
https://collaborative-task-manager-6721.onrender.com

🎯 Objective

The Collaborative Task Manager is a production-ready full-stack web application designed to manage tasks in a collaborative environment. It supports secure authentication, task CRUD operations, real-time collaboration, and personalized dashboards.

This project was built as part of a Full-Stack Engineering Assessment, focusing on clean architecture, scalability, and modern best practices.

⚙️ Tech Stack
Frontend

React (Vite)

TypeScript

Tailwind CSS

React Query (Server State Management)

React Hook Form + Zod (Form Validation)

Socket.io Client

Backend

Node.js

Express.js

TypeScript

PostgreSQL

Prisma ORM

JWT Authentication (HttpOnly Cookies)

bcrypt (Password Hashing)

Socket.io (Real-Time Communication)

Deployment

Frontend: Vercel

Backend: Render

Database: Railway (PostgreSQL)

🧠 Architecture Overview

The backend follows a clean layered architecture:

Controller → Service → Repository → Prisma → Database

Key Architectural Decisions:

Repository Pattern to isolate database logic

Service Layer for business rules

DTO Validation using Zod

JWT stored in HttpOnly cookies for secure authentication

Socket.io for real-time collaboration

🔐 Authentication & Authorization

Secure user registration & login

Passwords hashed using bcrypt

Authentication via JWT tokens

Tokens stored in HttpOnly cookies

Protected routes using custom Auth Middleware

📝 Task Management (CRUD)

Each task includes:

title (max 100 chars)

description

dueDate

priority (Low, Medium, High, Urgent)

status (To Do, In Progress, Review, Completed)

creatorId

assignedToId

Users can:

Create tasks

Update task details

Delete tasks (creator only)

Assign tasks to other users

⚡ Real-Time Collaboration (Socket.io)

Live task updates across all connected users

Instant assignment notifications

User-specific Socket.io rooms

Real-time dashboard refresh without page reload

📊 User Dashboard & Data Exploration

Each user has a personalized dashboard showing:

Tasks assigned to them

Tasks created by them

Overdue tasks

Filters by Status & Priority

Sorting by Due Date

🧪 Testing

Jest + ts-jest for backend unit testing

Tests focus on critical business logic

Repository layer mocked for clean unit tests

Ensures reliability and maintainability

📂 API Endpoints
Authentication
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

Tasks
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

🛠️ Local Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/collaborative-task-manager.git
cd collaborative-task-manager

2️⃣ Backend Setup
cd backend
npm install


Create .env:

DATABASE_URL=postgresql://username:password@localhost:5432/taskmanager
JWT_SECRET=your_secret_key


Run migrations:

npx prisma migrate dev


Start backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🚀 Deployment

Backend deployed on Render

Database hosted on Railway

Frontend deployed on Vercel

Fully live and production-ready

📌 Trade-offs & Assumptions

Focused on core assessment requirements

UI kept clean and minimal for clarity

Email verification not included (out of scope)

Optimistic updates can be added as a future enhancement

✨ Bonus Features (Optional Enhancements)

Optimistic UI updates with React Query

Audit logging for task status changes

Docker & docker-compose support

👨‍💻 Author

Devanshu Vishwakarma
Full Stack Web Developer
Skilled in React, TypeScript, Node.js, PostgreSQL, Prisma, and Real-Time Systems

🎉 Final Note

This project demonstrates:

Strong engineering fundamentals

Clean architecture

Secure authentication

Real-time collaboration

Production-ready deployment

✅ All assessment requirements fulfilled
