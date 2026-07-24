# 🤖 AI Coding Tutor

An AI-powered Coding Tutor built with React, Node.js, Express, Supabase, and Google Gemini. The application provides secure user authentication and an interactive chat interface where users can ask programming-related questions and receive AI-generated explanations in real time.

---

## Features

- Secure user registration and login
- JWT authentication
- Password hashing with bcrypt
- Protected tutor endpoint
- AI-powered coding assistance using Google Gemini
- Modern React frontend
- RESTful Express backend
- Supabase PostgreSQL database
- Responsive interface

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Tailwind CSS
- Axios / Fetch API

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Express Validator

### Database

- Supabase PostgreSQL

### AI

- Google Gemini API

---

## Project Structure

```
.
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── validators
│   │   └── server.js
│   └── package.json
```

---

## Installation

### Clone

```bash
git clone <repository-url>
cd <repository-name>
```

---

### Backend

```bash
cd backend
npm install
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
GEMINI_API_KEY=
GEMINI_MODEL=
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
```

---

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### Tutor

```
POST /api/tutor/ask
```

Requires a valid JWT Bearer Token.

---

## Deployment

Frontend:
- Vercel

Backend:
- Render

Database:
- Supabase

---

## Screenshots

_Add screenshots after deployment._

---

## Future Improvements

- Conversation history
- Code syntax highlighting
- Markdown rendering
- Theme switching
- Chat history
- User profiles
- Streaming AI responses
- Rate limiting

---

## Author

Your Name