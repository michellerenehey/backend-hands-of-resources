const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.get('/', (req, res) => {
  res.send('Hit root route');
});

app.use('/api/v1/housewives', require('./controllers/housewives'));
app.use('/api/v1/friends', require('./controllers/friends'));
app.use('/api/v1/flours', require('./controllers/flours'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
