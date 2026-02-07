const axios= require('axios');
const https= require('https');

const captainModel = require('../models/captain.model');
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.geocoding_api_key;

    if (!apiKey) {
        throw new Error("Geocoding API key is missing");
    }

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
    )}&key=${apiKey}&limit=1`;

    try {
        console.log("GEOCODING URL:", url);

        const response = await axios.get(url);

        if (!response.data || !response.data.results || response.data.results.length === 0) {
            throw new Error("No coordinates found for this address");
        }

        const location = response.data.results[0].geometry;

        return {
            lat: location.lat,
            lng: location.lng
        };

    } catch (error) {
        console.error("GEOCODING SERVICE ERROR:", error.response?.data || error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    const orsKey = process.env.distancematrixkey;
    const geoKey = process.env.geocoding_api_key;

    if (!origin || !destination)
        throw new Error("Origin and destination required");

    const geocode = async (address) => {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            address.trim()
        )}&key=${geoKey}&limit=1`;

        const res = await axios.get(url);
        if (!res.data.results.length)
            throw new Error(`Geocoding failed for ${address}`);

        const { lat, lng } = res.data.results[0].geometry;
        return [lng, lat];
    };

    const [o, d] = await Promise.all([geocode(origin), geocode(destination)]);

    const response = await axios.post(
        "https://api.openrouteservice.org/v2/matrix/driving-car",
        {
            locations: [o, d],
            metrics: ["distance", "duration"],
        },
        {
            headers: { Authorization: orsKey },
            httpsAgent: new https.Agent({ secureProtocol: "TLSv1_2_method" }),
        }
    );

    const distances = response.data.distances;
    const durations = response.data.durations;

    if (distances?.[0]?.[1] == null || durations?.[0]?.[1] == null) {
        throw new Error("Route not found");
    }

    return {
        distanceKm: (distances[0][1] / 1000).toFixed(2),
        durationMinutes: Math.ceil(durations[0][1] / 60),
    };
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.distancematrixkey;
    const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(input)}`;

    const agent = new https.Agent({
        secureProtocol: 'TLS_method'
    });

    try {
        const response = await axios.get(url, { httpsAgent: agent });
        if (response.data && response.data.features) {
            return response.data.features.map(feature => feature.properties.label);
        } else {
            throw new Error('No suggestions found');
        }
    } catch (err) {
        console.error('Error fetching autocomplete suggestions:', err.message);
        throw new Error('Unable to fetch suggestions');
    }
};
module.exports.getCaptainsInTheRadius = async (lat, lng, radiusKm) => {
  return await captainModel.find({
    status: "active",
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radiusKm / 6378.1]
      }
    }
  });
};