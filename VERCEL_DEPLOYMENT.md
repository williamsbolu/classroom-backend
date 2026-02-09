# Vercel Deployment Guide

This document provides instructions for deploying the Classroom Backend application to Vercel.

## Prerequisites

1. A Vercel account
2. Git repository with your code
3. Neon PostgreSQL database (or another PostgreSQL provider)

## Configuration Files

The following files have been added/modified to support Vercel deployment:

1. `vercel.json` - Configuration file for Vercel deployment
2. `src/index.ts` - Modified to support both local development and serverless deployment

## Environment Variables

The following environment variables need to be configured in the Vercel dashboard:

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:password@host:port/database?sslmode=require |
| FRONTEND_URL | URL of the frontend application | https://your-frontend-app.vercel.app |
| BETTER_AUTH_SECRET | Secret key for authentication | (a secure random string) |
| ARCJET_KEY | API key for Arcjet security service | ajkey_xxxxxxxxxxxx |
| ARCJET_ENV | Environment for Arcjet (development/production) | production |
| NODE_ENV | Node environment | production |

## Deployment Steps

1. **Push your code to a Git repository**
   
   Make sure your code is in a Git repository (GitHub, GitLab, or Bitbucket).

2. **Import your project in Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Import your Git repository
   - Configure the project:
     - Framework Preset: Other
     - Root Directory: ./classroom-backend (if your repo contains both frontend and backend)
     - Build and Output Settings: Use the default settings as they are handled by vercel.json
     - Install Command: npm install

3. **Configure Environment Variables**

   - In the project settings, go to "Environment Variables"
   - Add all the required environment variables listed above
   - Make sure to update FRONTEND_URL to your production frontend URL
   - Set NODE_ENV to "production"

4. **Deploy**

   - Click "Deploy"
   - Vercel will build and deploy your application

5. **Verify Deployment**

   - Once deployment is complete, Vercel will provide a URL for your backend
   - Test the API endpoints to ensure they're working correctly

## Troubleshooting

- **Database Connection Issues**: Ensure your DATABASE_URL is correct and that your database allows connections from Vercel's IP addresses.
- **CORS Errors**: Make sure FRONTEND_URL is set correctly to allow cross-origin requests from your frontend.
- **Build Failures**: Check the build logs for any errors. Common issues include missing dependencies or TypeScript errors.

## Local Development

For local development, you can still use:

```bash
npm run dev
```

The application will detect it's not in production mode and start a local server on port 8000.