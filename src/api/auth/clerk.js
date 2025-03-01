// const { ClerkExpressWithAuth } = require('@clerk/express');
// require('dotenv').config();

// if (!process.env.CLERK_SECRET_KEY) {
//   console.error('❌ Missing CLERK_SECRET_KEY in .env');
//   process.exit(1); // Stop server if Clerk key is missing
// }

// const clerkMiddleware = ClerkExpressWithAuth({
//   publishableKey: process.env.CLERK_PUBLISHABLE_KEY, // Optional but recommended
//   secretKey: process.env.CLERK_SECRET_KEY,
//   onError: (err, req, res, next) => {
//     console.error('🔴 Clerk Auth Error:', err);
//     res.status(401).json({ error: 'Unauthorized access', details: err.message });
//   },
// });

// module.exports = { clerkMiddleware };
