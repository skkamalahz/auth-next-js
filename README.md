# Next.js Authentication Project

This is a [Next.js](https://nextjs.org) authentication project with email verification and password reset functionality.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Before running the project, you need to set up the following environment variables. Create a `.env.local` file in the root directory and add these variables:

```env
# App URL
DOMAIN=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT
TOKEN_SECRET=your_jwt_secret_key

# SMTP (Email)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SMTP_FROM=noreply@yourdomain.com
```

## Deploying to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add the following environment variables in your Vercel project settings:
   - DOMAIN (your production URL, e.g., https://your-app.vercel.app)
   - MONGODB_URI
   - TOKEN_SECRET
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_USER
   - SMTP_PASS
   - SMTP_FROM

4. Deploy!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
