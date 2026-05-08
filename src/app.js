const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/requestLogger');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const challengeRoutes = require('./routes/challengeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Fitness Challenge Tracker API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
