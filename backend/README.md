# MediCompare Backend

REST API for medicine price comparison platform.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/medicompare"
   JWT_SECRET="your_jwt_secret_key"
   ```

3. Run database migrations:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Medicines
- `GET /api/medicines/search?query=medicine_name` - Search medicines

## Deployment on Render

1. **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
2. **Start Command**: `npm start`
3. **Environment Variables**: Set `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`