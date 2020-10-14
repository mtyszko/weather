const fetch = require('node-fetch');

const getLocationData = async (query) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    query,
  )}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1&language=pl`;
  try {
    const res = await fetch(url);
    const resData = await res.json();

    if (!resData.features || !resData.features.length)
      return {
        error:
          'Nie rozumiem zapytania. Podaj proszę prawidłowe kooorynaty lub wpisz nazwę lokalizacji',
      };

    const locationData = resData.features[0].center;
    console.log(resData.features[0]);
    const location = locationData.reduce((acc, el) => ({
      location: resData.features[0].place_name_pl,
      lat: el,
      lon: acc,
    }));

    return location;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = getLocationData;
