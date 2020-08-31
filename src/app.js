const express = require('express');
const getLocationData = require('../utils/get_location');
const getForecast = require('../utils/get_forecast');

const app = express();

app.get('/api-weather', async (req, res) => {
  const query = req.query.location;
  if (!query) return res.send({ error: 'location is missing!' });

  const location = await getLocationData(query);
  if (location.error) return res.send(location);

  const { lat, lon } = location;

  const forecast = await getForecast(lat, lon);

  res.send({ location, forecast });
});

app.get('*', (req, res) => {
  res.send({ error: '400: bad request' });
});

module.exports = app;
