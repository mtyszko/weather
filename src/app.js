const express = require('express');

const app = express();

app.get('', (req, res) => {
  res.send('hello misio!');
});

app.get('/api-weather', (req, res) => {
  if (!req.query.location) return res.send({ error: 'location is missing!' });
  res.send('hello misio!');
});

module.exports = app;
