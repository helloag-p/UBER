const axios= require('axios');
const https= require('https');

const captainModel = require('../models/captain.models');
// module.exports.getAddressCoordinate = async (address) => {
//     const apiKey = process.env.GOOGLE_MAPS_API;
//     console.log('API Key:', apiKey); // REMOVE in production!

//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             const location = response.data.results[ 0 ].geometry.location;
//             return {
//                 lat: location.lat,
//                 lng: location.lng
//             };
//         } else {
//             throw new Error('Unable to fetch coordinates');
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.geocoding_api_key;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status.code === 200 && response.data.results.length > 0) {
            const location = response.data.results[0].geometry;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            console.error('OpenCage API error:', response.data);
            throw new Error(`Unable to fetch coordinates: ${response.data.status.message}`);
        }

    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};



// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;

//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//     try {


//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {

//             if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
//                 throw new Error('No routes found');
//             }

//             return response.data.rows[ 0 ].elements[ 0 ];
//         } else {
//             throw new Error('Unable to fetch distance and time');
//         }

//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }
// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.distancematrixkey;

//     // Geocode the addresses to coordinates using OpenCage or any geocoder
//     const geocode = async (address) => {
//         const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.geocoding_api_key}`;
//         const response = await axios.get(geoUrl);
//         if (response.data.results.length === 0) throw new Error("Unable to geocode address");
//         return [
//             response.data.results[0].geometry.lng,
//             response.data.results[0].geometry.lat
//         ]; // OpenRouteService expects [lng, lat]
//     };

//     try {
//         const [originCoords, destinationCoords] = await Promise.all([
//             geocode(origin),
//             geocode(destination)
//         ]);

//         const matrixUrl = 'https://api.openrouteservice.org/v2/matrix/driving-car';

//         const response = await axios.post(
//             matrixUrl,
//             {
//                 locations: [originCoords, destinationCoords],
//                 metrics: ['distance', 'duration']
//             },
//             {
//                 headers: {
//                     'Authorization': apiKey,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         const distance = response.data.distances[0][1]; // in meters
//         const duration = response.data.durations[0][1]; // in seconds

//         return {
//             distance: `${(distance / 1000).toFixed(2)} km`,
//             duration: `${Math.ceil(duration / 60)} mins`
//         };

//     } catch (err) {
//         console.error('Error fetching distance matrix:', err.message);
//         throw new Error('Failed to retrieve distance and time');
//     }
// };
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.distancematrixkey;

    const geocode = async (address) => {
        const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.geocoding_api_key}`;
        const response = await axios.get(geoUrl, {
            httpsAgent: new https.Agent({ secureProtocol: 'TLSv1_2_method' }),
            timeout: 10000,
        });
        if (response.data.results.length === 0) throw new Error("Unable to geocode address");
        return [
            response.data.results[0].geometry.lng,
            response.data.results[0].geometry.lat
        ];
    };

    try {
        const [originCoords, destinationCoords] = await Promise.all([
            geocode(origin),
            geocode(destination)
        ]);

        const matrixUrl = 'https://api.openrouteservice.org/v2/matrix/driving-car';

        const response = await axios.post(
            matrixUrl,
            {
                locations: [originCoords, destinationCoords],
                metrics: ['distance', 'duration']
            },
            {
                headers: {
                    'Authorization': apiKey,
                    'Content-Type': 'application/json'
                },
                httpsAgent: new https.Agent({ secureProtocol: 'TLSv1_2_method' }),
                timeout: 10000,
            }
        );

        const distance = response.data.distances[0][1];
        const duration = response.data.durations[0][1];

        return {
            distance: `${(distance / 1000).toFixed(2)} km`,
            duration: `${Math.ceil(duration / 60)} mins`
        };
    } catch (err) {
        console.error('Error fetching distance matrix:', err.message);
        throw new Error('Failed to retrieve distance and time');
    }
};

// module.exports.getAutoCompleteSuggestions = async (input) => {
//     if (!input) {
//         throw new Error('query is required');
//     }
//     const apiKey = process.env.distancematrixkey;
//     const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(input)}`;
//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             return response.data.predictions.map(prediction => prediction.description).filter(value => value);
//         } else {
//             throw new Error('Unable to fetch suggestions');
//         }
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }
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