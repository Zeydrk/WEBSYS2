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
const planetsController_1 = require("./planetsController");
const db = require('../../models');
jest.mock('../../models', () => ({
    Planets: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    },
    Pets: {
        name: 'MockPetModel'
    },
}));
describe('Planets Controller', () => {
    let req;
    let res;
    let statusMock;
    let jsonMock;
    beforeEach(() => {
        req = { params: {}, body: {} };
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = {
            json: jsonMock,
            status: statusMock,
        };
        jest.clearAllMocks();
    });
    // --- Test: getAllPlanets ---
    describe('getAllPlanets', () => {
        it('should return all planets', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPlanets = [
                { id: 1, planetName: 'Earth', distanceFromSun: 1 },
                { id: 2, planetName: 'Mars', distanceFromSun: 1.5 }
            ];
            db.Planets.findAll.mockResolvedValue(mockPlanets);
            yield (0, planetsController_1.getAllPlanets)(req, res);
            expect(db.Planets.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockPlanets);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('DB Error');
            db.Planets.findAll.mockRejectedValue(error);
            yield (0, planetsController_1.getAllPlanets)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting planets', error });
        }));
    });
    // --- Test: getPlanetById ---
    describe('getPlanetById', () => {
        it('should return a planet with nativePets if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockPlanet = {
                id: 1,
                planetName: 'Mars',
                nativePets: []
            };
            db.Planets.findByPk.mockResolvedValue(mockPlanet);
            yield (0, planetsController_1.getPlanetById)(req, res);
            // Verify strict check on how findByPk was called (including the association)
            expect(db.Planets.findByPk).toHaveBeenCalledWith('1', {
                include: [{
                        model: db.Pets,
                        as: 'nativePets'
                    }]
            });
            expect(res.json).toHaveBeenCalledWith(mockPlanet);
        }));
        it('should return 404 if planet not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Planets.findByPk.mockResolvedValue(null);
            yield (0, planetsController_1.getPlanetById)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Planet not found' });
        }));
    });
    // --- Test: createPlanet ---
    describe('createPlanet', () => {
        it('should create a planet and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = { planetName: 'Jupiter', distanceFromSun: 5.2 };
            const createdPlanet = Object.assign({ id: 1 }, req.body);
            db.Planets.create.mockResolvedValue(createdPlanet);
            yield (0, planetsController_1.createPlanet)(req, res);
            expect(db.Planets.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(createdPlanet);
        }));
        it('should handle creation errors', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('Creation failed');
            db.Planets.create.mockRejectedValue(error);
            yield (0, planetsController_1.createPlanet)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Error creating planet', error });
        }));
    });
    // --- Test: updatePlanet ---
    describe('updatePlanet', () => {
        it('should update a planet if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            req.body = { planetName: 'New Earth', distanceFromSun: 1.1 };
            const mockUpdateFn = jest.fn();
            const mockPlanetInstance = {
                id: 1,
                planetName: 'Earth',
                update: mockUpdateFn
            };
            db.Planets.findByPk.mockResolvedValue(mockPlanetInstance);
            yield (0, planetsController_1.updatePlanet)(req, res);
            expect(mockPlanetInstance.update).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(mockPlanetInstance);
        }));
        it('should return 404 if planet to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Planets.findByPk.mockResolvedValue(null);
            yield (0, planetsController_1.updatePlanet)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
    // --- Test: deletePlanet ---
    describe('deletePlanet', () => {
        it('should delete a planet if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockDestroyFn = jest.fn();
            const mockPlanetInstance = {
                id: 1,
                destroy: mockDestroyFn
            };
            db.Planets.findByPk.mockResolvedValue(mockPlanetInstance);
            yield (0, planetsController_1.deletePlanet)(req, res);
            expect(mockPlanetInstance.destroy).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Planet deleted successfully' });
        }));
        it('should return 404 if planet to delete is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Planets.findByPk.mockResolvedValue(null);
            yield (0, planetsController_1.deletePlanet)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
});
