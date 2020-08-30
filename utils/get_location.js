const fetch = require('node-fetch');

const getLocationData = async (location) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location,
  )}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1&language=pl`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.features);
    if (!data.features || !data.features.length)
      return { error: 'location not found!' };
    const loctationData = data.features[0].center;
    console.log(loctationData);

    return loctationData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = getLocationData;

// https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponentlocation.json?access_token=pk.eyJ1IjoibXRkZXY0MDQiLCJhIjoiY2tkNXZxZ3J3MDBuaTJxdGdmYjh4ZGNraiJ9.cBl4-YvJOGj9PVoZbuddow&limit=1&language=pl
