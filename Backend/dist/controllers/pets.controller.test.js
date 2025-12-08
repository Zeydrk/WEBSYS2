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
const petsController_1 = require("./petsController");
const db = require('../../models');
jest.mock('../../models', () => ({
    Pets: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    },
    Planets: { name: 'MockPlanetModel' },
}));
describe('Pets Controller', () => {
    let req;
    let res;
    let statusMock;
    let jsonMock;
    beforeEach(() => {
        req = { params: {}, body: {} }; // Initialize with empty objects
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = {
            json: jsonMock,
            status: statusMock,
        };
        jest.clearAllMocks();
    });
    // --- Test: getAllPets ---
    describe('getAllPets', () => {
        it('should return all pets with planet info', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPets = [{ id: 1, name: 'Space Dog', originPlanet: { name: 'Mars' } }];
            db.Pets.findAll.mockResolvedValue(mockPets);
            yield (0, petsController_1.getAllPets)(req, res);
            // Verify it was called with the correct include options
            expect(db.Pets.findAll).toHaveBeenCalledWith({
                include: [{
                        model: db.Planets,
                        as: 'originPlanet'
                    }]
            });
            expect(res.json).toHaveBeenCalledWith(mockPets);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('DB Error');
            db.Pets.findAll.mockRejectedValue(error);
            yield (0, petsController_1.getAllPets)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting pets', error });
        }));
    });
    // --- Test: getPetById ---
    describe('getPetById', () => {
        it('should return a pet if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockPet = { id: 1, name: 'Alien Cat' };
            db.Pets.findByPk.mockResolvedValue(mockPet);
            yield (0, petsController_1.getPetById)(req, res);
            // Verify findByPk includes the association
            expect(db.Pets.findByPk).toHaveBeenCalledWith('1', {
                include: [{
                        model: db.Planets,
                        as: 'originPlanet'
                    }]
            });
            expect(res.json).toHaveBeenCalledWith(mockPet);
        }));
        it('should return 404 if pet not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Pets.findByPk.mockResolvedValue(null);
            yield (0, petsController_1.getPetById)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Pet not found' });
        }));
    });
    // --- Test: createPet ---
    describe('createPet', () => {
        it('should create a pet and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                planetId: 1,
                name: 'Moon Rabbit',
                species: 'Rabbit',
                basePrice: 100,
                stockQty: 10
            };
            const createdPet = Object.assign({ id: 1 }, req.body);
            db.Pets.create.mockResolvedValue(createdPet);
            yield (0, petsController_1.createPet)(req, res);
            expect(db.Pets.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(createdPet);
        }));
    });
    // --- Test: updatePet ---
    describe('updatePet', () => {
        it('should update a pet if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            req.body = { name: 'Updated Name', stockQty: 20 };
            const mockUpdateFn = jest.fn();
            const mockPetInstance = { id: 1, update: mockUpdateFn };
            db.Pets.findByPk.mockResolvedValue(mockPetInstance);
            yield (0, petsController_1.updatePet)(req, res);
            expect(mockPetInstance.update).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(mockPetInstance);
        }));
        it('should return 404 if pet to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Pets.findByPk.mockResolvedValue(null);
            yield (0, petsController_1.updatePet)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
    // --- Test: updateStock (Specific Feature) ---
    describe('updateStock', () => {
        it('should update only the stock quantity', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            req.body = { quantity: 50 };
            const mockUpdateFn = jest.fn();
            const mockPetInstance = {
                id: 1,
                name: 'Pet',
                stockQty: 10,
                update: mockUpdateFn
            };
            db.Pets.findByPk.mockResolvedValue(mockPetInstance);
            yield (0, petsController_1.updateStock)(req, res);
            expect(db.Pets.findByPk).toHaveBeenCalledWith('1');
            // Crucial: Check that update was called with 'stockQty', mapped from 'quantity'
            expect(mockPetInstance.update).toHaveBeenCalledWith({ stockQty: 50 });
            expect(res.json).toHaveBeenCalledWith(mockPetInstance);
        }));
        it('should return 404 if pet for stock update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Pets.findByPk.mockResolvedValue(null);
            yield (0, petsController_1.updateStock)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
    // --- Test: deletePet ---
    describe('deletePet', () => {
        it('should delete a pet if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockDestroyFn = jest.fn();
            const mockPetInstance = { id: 1, destroy: mockDestroyFn };
            db.Pets.findByPk.mockResolvedValue(mockPetInstance);
            yield (0, petsController_1.deletePet)(req, res);
            expect(mockPetInstance.destroy).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Pet deleted successfully' });
        }));
    });
});
