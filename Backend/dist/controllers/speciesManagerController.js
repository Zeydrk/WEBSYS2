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
exports.deleteManager = exports.updateManager = exports.createManager = exports.getManagerById = exports.getAllManagers = void 0;
const getDb = () => require('../../models');
// Get all species managers
const getAllManagers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const managers = yield getDb().Species_Manager.findAll({
            include: [{
                    model: getDb().Pets,
                    as: 'managedSpecies'
                }]
        });
        res.json(managers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting managers', error });
    }
});
exports.getAllManagers = getAllManagers;
// Get one manager by ID
const getManagerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manager = yield getDb().Species_Manager.findByPk(req.params.id, {
            include: [{
                    model: getDb().Pets,
                    as: 'managedSpecies'
                }]
        });
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }
        res.json(manager);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting manager', error });
    }
});
exports.getManagerById = getManagerById;
// Create new species manager
const createManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { petId, name, role, email } = req.body;
        const manager = yield getDb().Species_Manager.create({
            petId,
            name,
            role,
            email
        });
        res.status(201).json(manager);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating manager', error });
    }
});
exports.createManager = createManager;
// Update species manager
const updateManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { petId, name, role, email } = req.body;
        const manager = yield getDb().Species_Manager.findByPk(req.params.id);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }
        yield manager.update({ petId, name, role, email });
        res.json(manager);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating manager', error });
    }
});
exports.updateManager = updateManager;
// Delete species manager
const deleteManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manager = yield getDb().Species_Manager.findByPk(req.params.id);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }
        yield manager.destroy();
        res.json({ message: 'Manager deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting manager', error });
    }
});
exports.deleteManager = deleteManager;
