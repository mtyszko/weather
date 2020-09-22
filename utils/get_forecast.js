const fetch = require('node-fetch');

const getForecast = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
exclude={part}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pl`;

    const serverRes = await fetch(url);
    const data = await serverRes.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = getForecast;
