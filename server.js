require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/models'); // Use centralized imports
// const { clerkMiddleware } = require('./src/api/auth/clerk');

const videoRoutes = require('./src/api/videos');
const hostRoutes = require("./src/api/routes/hostRoutes");
const interviewRoutes = require("./src/api/routes/interviewRoutes");
const videoLinkRoutes = require("./src/api/routes/videoLinkRoutes");
const timestampRoutes = require("./src/api/routes/timestampRoutes");
const analysisRoutes = require("./src/api/routes/analysisRoutes");
const questionsRoutes = require("./src/api/routes/questionsRoutes");


const server = express();
const PORT = process.env.PORT || 6000;

// Middlewares required
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
// app.use(clerkMiddleware);

// Test Database Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    await sequelize.sync({ alter: true }); // Ensure database is in sync
    console.log('✅ Database synchronized.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
})();

/* Routes */
server.use('/api/videos', videoRoutes);
server.use("/api/hosts", hostRoutes);
server.use("/api/interviews", interviewRoutes);
server.use("/api/videolinks", videoLinkRoutes);
server.use("/api/timestamps", timestampRoutes);
server.use("/api/analysis", analysisRoutes);
server.use("/api/questions", questionsRoutes);


// Root Route
server.get('/', (req, res) => {
  res.send("<h1>Heyy! It's Cognicore Babyyy</h1>");
});

// Global Error Handler
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Oops! Something went wrong!' });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
