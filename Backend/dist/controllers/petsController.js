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
exports.updateStock = exports.deletePet = exports.updatePet = exports.createPet = exports.getPetById = exports.getAllPets = void 0;
const getDb = () => require('../../models');
// Get all pets with their planet info
const getAllPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield getDb().Pets.findAll({
            include: [{
                    model: getDb().Planets,
                    as: 'originPlanet'
                }]
        });
        res.json(pets);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting pets', error });
    }
});
exports.getAllPets = getAllPets;
// Get one pet by ID
const getPetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pet = yield getDb().Pets.findByPk(req.params.id, {
            include: [{
                    model: getDb().Planets,
                    as: 'originPlanet'
                }]
        });
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting pet', error });
    }
});
exports.getPetById = getPetById;
// Create new pet
const createPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { planetId, name, species, description, basePrice, stockQty } = req.body;
        const pet = yield getDb().Pets.create({
            planetId,
            name,
            species,
            description,
            basePrice,
            stockQty
        });
        res.status(201).json(pet);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating pet', error });
    }
});
exports.createPet = createPet;
// Update pet
const updatePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { planetId, name, species, description, basePrice, stockQty } = req.body;
        const pet = yield getDb().Pets.findByPk(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        yield pet.update({
            planetId,
            name,
            species,
            description,
            basePrice,
            stockQty
        });
        res.json(pet);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating pet', error });
    }
});
exports.updatePet = updatePet;
// Delete pet
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pet = yield getDb().Pets.findByPk(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        yield pet.destroy();
        res.json({ message: 'Pet deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting pet', error });
    }
});
exports.deletePet = deletePet;
// Update stock quantity
const updateStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quantity } = req.body;
        const pet = yield getDb().Pets.findByPk(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        yield pet.update({ stockQty: quantity });
        res.json(pet);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating stock', error });
    }
});
exports.updateStock = updateStock;
