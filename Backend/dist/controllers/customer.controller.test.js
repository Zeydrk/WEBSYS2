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
const customerController_1 = require("./customerController");
const db = require('../../models');
jest.mock('../../models', () => ({
    Customer: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
    },
}));
describe('Customer Controller', () => {
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
    // --- Test: getAllCustomers ---
    describe('getAllCustomers', () => {
        it('should return all customers with status 200 (implied)', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCustomers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
            db.Customer.findAll.mockResolvedValue(mockCustomers);
            yield (0, customerController_1.getAllCustomers)(req, res);
            expect(db.Customer.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockCustomers);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            const error = new Error('DB Error');
            db.Customer.findAll.mockRejectedValue(error);
            yield (0, customerController_1.getAllCustomers)(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting customers', error });
        }));
    });
    // --- Test: getCustomerById ---
    describe('getCustomerById', () => {
        it('should return a customer if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockCustomer = { id: 1, name: 'John' };
            db.Customer.findByPk.mockResolvedValue(mockCustomer);
            yield (0, customerController_1.getCustomerById)(req, res);
            expect(db.Customer.findByPk).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith(mockCustomer);
        }));
        it('should return 404 if customer not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Customer.findByPk.mockResolvedValue(null);
            yield (0, customerController_1.getCustomerById)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Customer not found' });
        }));
    });
    // --- Test: createCustomer ---
    describe('createCustomer', () => {
        it('should create a customer and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
            const newCustomerData = { name: 'Doe', email: 'd@test.com', contactNo: '123' };
            req.body = newCustomerData;
            const createdCustomer = Object.assign({ id: 1 }, newCustomerData);
            db.Customer.create.mockResolvedValue(createdCustomer);
            yield (0, customerController_1.createCustomer)(req, res);
            expect(db.Customer.create).toHaveBeenCalledWith(newCustomerData);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(createdCustomer);
        }));
    });
    // --- Test: updateCustomer ---
    describe('updateCustomer', () => {
        it('should update a customer if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            req.body = { name: 'Updated Name' };
            const mockUpdateFn = jest.fn();
            const mockCustomerInstance = {
                id: 1,
                name: 'Old Name',
                update: mockUpdateFn
            };
            db.Customer.findByPk.mockResolvedValue(mockCustomerInstance);
            yield (0, customerController_1.updateCustomer)(req, res);
            expect(db.Customer.findByPk).toHaveBeenCalledWith('1');
            expect(mockCustomerInstance.update).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(mockCustomerInstance);
        }));
        it('should return 404 if customer to update is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Customer.findByPk.mockResolvedValue(null);
            yield (0, customerController_1.updateCustomer)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
    describe('deleteCustomer', () => {
        it('should delete a customer if found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '1' };
            const mockDestroyFn = jest.fn();
            const mockCustomerInstance = {
                id: 1,
                destroy: mockDestroyFn
            };
            db.Customer.findByPk.mockResolvedValue(mockCustomerInstance);
            yield (0, customerController_1.deleteCustomer)(req, res);
            expect(mockCustomerInstance.destroy).toHaveBeenCalled();
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Customer deleted successfully' });
        }));
        it('should return 404 if customer to delete is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            req.params = { id: '999' };
            db.Customer.findByPk.mockResolvedValue(null);
            yield (0, customerController_1.deleteCustomer)(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        }));
    });
});
