const express = require('express');
const getLocationData = require('../utils/get_location');
const getForecast = require('../utils/get_forecast');

const app = express();

app.get('/api-weather', async (req, res) => {
  const query = req.query.location;
  if (!query) return res.send({ error: 'location is missing!' });

  const locationData = await getLocationData(query);
  if (locationData.error) return res.send(locationData);

  const location = locationData.reduce((acc, el) => ({
    lat: acc,
    lon: el,
  }));

  const { lat, lon } = location;

  const forecast = await getForecast(lat, lon);

  res.send(forecast);
});

app.get('*', (req, res) => {
  res.send({ error: '400: bad request' });
});

module.exports = app;
