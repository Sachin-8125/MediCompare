# MediCompare Frontend

React frontend for the medicine price comparison platform.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   VITE_API_URL="http://localhost:5000/api"
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Features

- User authentication (register/login)
- Medicine search interface
- Price comparison display
- Responsive design with Tailwind CSS

## Build for Production

```bash
npm run build
```

## Deployment

- Deploy on Vercel or Netlify
- Update `VITE_API_URL` to production backend URL
