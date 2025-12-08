"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlanet = exports.updatePlanet = exports.createPlanet = exports.getPlanetById = exports.getAllPlanets = void 0;
const getDb = () => require('../../models');
// Get all planets
const getAllPlanets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planets = yield getDb().Planets.findAll();
        res.json(planets);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting planets', error });
    }
});
exports.getAllPlanets = getAllPlanets;
// Get one planet by ID
const getPlanetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planet = yield getDb().Planets.findByPk(req.params.id, {
            include: [{
                    model: getDb().Pets,
                    as: 'nativePets'
                }]
        });
        if (!planet) {
            return res.status(404).json({ message: 'Planet not found' });
        }
        res.json(planet);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting planet', error });
    }
});
exports.getPlanetById = getPlanetById;
// Create new planet
const createPlanet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { planetName, distanceFromSun } = req.body;
        const planet = yield getDb().Planets.create({
            planetName,
            distanceFromSun
        });
        res.status(201).json(planet);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating planet', error });
    }
});
exports.createPlanet = createPlanet;
// Update planet
const updatePlanet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { planetName, distanceFromSun } = req.body;
        const planet = yield getDb().Planets.findByPk(req.params.id);
        if (!planet) {
            return res.status(404).json({ message: 'Planet not found' });
        }
        yield planet.update({ planetName, distanceFromSun });
        res.json(planet);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating planet', error });
    }
});
exports.updatePlanet = updatePlanet;
// Delete planet
const deletePlanet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const planet = yield getDb().Planets.findByPk(req.params.id);
        if (!planet) {
            return res.status(404).json({ message: 'Planet not found' });
        }
        yield planet.destroy();
        res.json({ message: 'Planet deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting planet', error });
    }
});
exports.deletePlanet = deletePlanet;
