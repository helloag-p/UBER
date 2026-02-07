const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ message: "Address query parameter is required" });
    }

    try {
        console.log("ADDRESS RECEIVED:", address);

        const coordinates = await mapService.getAddressCoordinate(address);

        return res.status(200).json({
            success: true,
            coordinates
        });

    } catch (error) {
        console.error("GET COORDINATES ERROR:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({
            message: "origin and destination are required"
        });
    }

    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);

        return res.status(200).json({
            success: true,
            distanceTime
        });

    } catch (error) {
        console.error("DISTANCE TIME ERROR:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    if (!input) {
        return res.status(400).json({
            message: "input query parameter is required"
        });
    }

    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        return res.status(200).json({
            success: true,
            suggestions
        });

    } catch (error) {
        console.error("AUTOCOMPLETE ERROR:", error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
