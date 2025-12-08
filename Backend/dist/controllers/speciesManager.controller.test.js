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
const speciesManagerController_1 = require("./speciesManagerController");
const db = require('../../models');
jest.mock('../../models', () => ({
    Species_Manager: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    },
    Pets: {
        name: 'MockPetsModel'
    },
}));
describe('Species Manager Controller', () => {
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
    // --- Test: getAllManagers ---
    describe('getAllManagers', () => {
        it('should return all managers with managedSpecies info', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockManagers = [
                { id: 1, name: 'Dr. Smith', managedSpecies: { name: 'Space Dog' } }
            ];
            db.Species_Manager.findAll.mockResolvedValue(mockManagers);
            yield (0, speciesManagerController_1.getAllManagers)(req, res);
            // Verify the include was passed correctly
            expect(db.Species_Manager.findAll).toHaveBeenCalledWith({
                include: [{
                        model: db.Pets,
                        as: 'managedSpecies'
                    }]
            });
            expect(res.json).toHaveBeenCalledWith(mockManagers);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('DB Error');
            db.Species_Manager.findAll.mockRejectedValue(error);
            yield (0, speciesManagerController_1.getAllManagers)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting managers', error });
        }));
    });
    // --- Test: getManagerById ---
    describe('getManagerById', () => {
        it('should return a manager if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockManager = { id: 1, name: 'Dr. Smith' };
            db.Species_Manager.findByPk.mockResolvedValue(mockManager);
            yield (0, speciesManagerController_1.getManagerById)(req, res);
            expect(db.Species_Manager.findByPk).toHaveBeenCalledWith('1', {
                include: [{
                        model: db.Pets,
                        as: 'managedSpecies'
                    }]
            });
            expect(res.json).toHaveBeenCalledWith(mockManager);
        }));
        it('should return 404 if manager not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Species_Manager.findByPk.mockResolvedValue(null);
            yield (0, speciesManagerController_1.getManagerById)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Manager not found' });
        }));
    });
    // --- Test: createManager ---
    describe('createManager', () => {
        it('should create a manager and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                petId: 1,
                name: 'Jane Doe',
                role: 'Veterinarian',
                email: 'jane@zoo.com'
            };
            const createdManager = Object.assign({ id: 1 }, req.body);
            db.Species_Manager.create.mockResolvedValue(createdManager);
            yield (0, speciesManagerController_1.createManager)(req, res);
            expect(db.Species_Manager.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(createdManager);
        }));
        it('should handle creation errors', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('Creation failed');
            db.Species_Manager.create.mockRejectedValue(error);
            yield (0, speciesManagerController_1.createManager)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        }));
    });
    // --- Test: updateManager ---
    describe('updateManager', () => {
        it('should update a manager if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            req.body = { name: 'Jane Updated', role: 'Head Vet' };
            const mockUpdateFn = jest.fn();
            const mockManagerInstance = {
                id: 1,
                name: 'Jane Doe',
                update: mockUpdateFn
            };
            db.Species_Manager.findByPk.mockResolvedValue(mockManagerInstance);
            yield (0, speciesManagerController_1.updateManager)(req, res);
            expect(mockManagerInstance.update).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(mockManagerInstance);
        }));
        it('should return 404 if manager to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Species_Manager.findByPk.mockResolvedValue(null);
            yield (0, speciesManagerController_1.updateManager)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
    // --- Test: deleteManager ---
    describe('deleteManager', () => {
        it('should delete a manager if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockDestroyFn = jest.fn();
            const mockManagerInstance = {
                id: 1,
                destroy: mockDestroyFn
            };
            db.Species_Manager.findByPk.mockResolvedValue(mockManagerInstance);
            yield (0, speciesManagerController_1.deleteManager)(req, res);
            expect(mockManagerInstance.destroy).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Manager deleted successfully' });
        }));
        it('should return 404 if manager to delete is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Species_Manager.findByPk.mockResolvedValue(null);
            yield (0, speciesManagerController_1.deleteManager)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
});
