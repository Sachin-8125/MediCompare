# MediCompare

A medicine price comparison platform that helps users find the best prices for medicines across different pharmacies.

## Features

- User authentication (register/login)
- Medicine search by name or generic name
- Price comparison across multiple pharmacies
- Responsive design

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT

## Quick Start

1. Clone the repository
2. Set up backend:
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev
   npm start
   ```

3. Set up frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="your_postgresql_url"
JWT_SECRET="your_jwt_secret"
```

### Frontend (.env)
```
VITE_API_URL="http://localhost:5000/api"
```

## Deployment

- Backend: Deploy on Render
- Frontend: Deploy on Vercel/Netlify