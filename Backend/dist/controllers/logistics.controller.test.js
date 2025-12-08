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
const logisticsController_1 = require("./logisticsController");
const db = require('../../models');
jest.mock('../../models', () => ({
    Logistics: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    },
}));
describe('Logistics Controller', () => {
    let req;
    let res;
    let statusMock;
    let jsonMock;
    beforeEach(() => {
        req = {};
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = {
            json: jsonMock,
            status: statusMock,
        };
        jest.clearAllMocks();
    });
    // --- Test: getAllLogistics ---
    describe('getAllLogistics', () => {
        it('should return all logistics providers', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockLogistics = [
                { id: 1, name: 'DHL', delivery_rate: 50 },
                { id: 2, name: 'FedEx', delivery_rate: 60 }
            ];
            db.Logistics.findAll.mockResolvedValue(mockLogistics);
            yield (0, logisticsController_1.getAllLogistics)(req, res);
            expect(db.Logistics.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockLogistics);
        }));
        it('should handle errors with 500 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('DB Error');
            db.Logistics.findAll.mockRejectedValue(error);
            yield (0, logisticsController_1.getAllLogistics)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting logistics', error });
        }));
    });
    // --- Test: getLogisticsById ---
    describe('getLogisticsById', () => {
        it('should return a provider if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockProvider = { id: 1, name: 'DHL', delivery_rate: 50 };
            db.Logistics.findByPk.mockResolvedValue(mockProvider);
            yield (0, logisticsController_1.getLogisticsById)(req, res);
            expect(db.Logistics.findByPk).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith(mockProvider);
        }));
        it('should return 404 if provider not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Logistics.findByPk.mockResolvedValue(null);
            yield (0, logisticsController_1.getLogisticsById)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Logistics provider not found' });
        }));
    });
    // --- Test: createLogistics ---
    describe('createLogistics', () => {
        it('should create a provider and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const newProviderData = { name: 'UPS', delivery_rate: 55 };
            req.body = newProviderData;
            const createdProvider = Object.assign({ id: 1 }, newProviderData);
            db.Logistics.create.mockResolvedValue(createdProvider);
            yield (0, logisticsController_1.createLogistics)(req, res);
            expect(db.Logistics.create).toHaveBeenCalledWith(newProviderData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(createdProvider);
        }));
    });
    // --- Test: updateLogistics ---
    describe('updateLogistics', () => {
        it('should update a provider if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            req.body = { name: 'DHL Express', delivery_rate: 52 };
            const mockUpdateFn = jest.fn();
            const mockProviderInstance = {
                id: 1,
                name: 'DHL',
                delivery_rate: 50,
                update: mockUpdateFn
            };
            db.Logistics.findByPk.mockResolvedValue(mockProviderInstance);
            yield (0, logisticsController_1.updateLogistics)(req, res);
            expect(db.Logistics.findByPk).toHaveBeenCalledWith('1');
            expect(mockProviderInstance.update).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(mockProviderInstance);
        }));
        it('should return 404 if provider to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Logistics.findByPk.mockResolvedValue(null);
            yield (0, logisticsController_1.updateLogistics)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
    // --- Test: deleteLogistics ---
    describe('deleteLogistics', () => {
        it('should delete a provider if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockDestroyFn = jest.fn();
            const mockProviderInstance = {
                id: 1,
                destroy: mockDestroyFn
            };
            db.Logistics.findByPk.mockResolvedValue(mockProviderInstance);
            yield (0, logisticsController_1.deleteLogistics)(req, res);
            expect(mockProviderInstance.destroy).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Logistics provider deleted successfully' });
        }));
        it('should return 404 if provider to delete is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Logistics.findByPk.mockResolvedValue(null);
            yield (0, logisticsController_1.deleteLogistics)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
});
