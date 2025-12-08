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
exports.deleteLogistics = exports.updateLogistics = exports.createLogistics = exports.getLogisticsById = exports.getAllLogistics = void 0;
const getDb = () => require('../../models');
// Get all logistics providers
const getAllLogistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logistics = yield getDb().Logistics.findAll();
        res.json(logistics);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting logistics', error });
    }
});
exports.getAllLogistics = getAllLogistics;
// Get one logistics provider by ID
const getLogisticsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logistics = yield getDb().Logistics.findByPk(req.params.id);
        if (!logistics) {
            return res.status(404).json({ message: 'Logistics provider not found' });
        }
        res.json(logistics);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting logistics', error });
    }
});
exports.getLogisticsById = getLogisticsById;
// Create new logistics provider
const createLogistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, delivery_rate } = req.body;
        const logistics = yield getDb().Logistics.create({
            name,
            delivery_rate
        });
        res.status(201).json(logistics);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating logistics', error });
    }
});
exports.createLogistics = createLogistics;
// Update logistics provider
const updateLogistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, delivery_rate } = req.body;
        const logistics = yield getDb().Logistics.findByPk(req.params.id);
        if (!logistics) {
            return res.status(404).json({ message: 'Logistics provider not found' });
        }
        yield logistics.update({ name, delivery_rate });
        res.json(logistics);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating logistics', error });
    }
});
exports.updateLogistics = updateLogistics;
// Delete logistics provider
const deleteLogistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logistics = yield getDb().Logistics.findByPk(req.params.id);
        if (!logistics) {
            return res.status(404).json({ message: 'Logistics provider not found' });
        }
        yield logistics.destroy();
        res.json({ message: 'Logistics provider deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting logistics', error });
    }
});
exports.deleteLogistics = deleteLogistics;
