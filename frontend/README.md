# Abhnya - Event Planning App

This is the frontend and backend codebase for the Abhnya Event Planning website.

## Prerequisites
- Node.js
- npm

## Setup & Environment Variables

### Backend
The backend serves as a proxy to fetch Instagram Reels data and bypass CORS.
Create a `.env` file in the `backend/` directory with the following variables:

```env
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=instagram-looter2.p.rapidapi.com
PORT=5000
```
> **Important**: Do not commit the `.env` file to version control. The RapidAPI key must be kept secret.

### Frontend
The frontend is a Vite + React application. It requires the backend to be running to fetch Instagram data.
If deploying the backend separately, create a `.env` file in the `frontend/` directory (or configure Vercel environment variables) with:

```env
VITE_API_URL=https://your-backend-url.com
```
(If left blank, it defaults to `http://localhost:5000` for local development).

## Running Locally

To run both frontend and backend concurrently from the `frontend/` directory:
```bash
npm run dev:all
```

To build for production:
```bash
npm run build
```

## Resources
- [Hero videos, showreels & gallery](https://drive.google.com/drive/folders/1Yjp1V8HgjJVNTaX1UoO-J1QzJRKnzOE0?usp=sharing)
