import { 
  getAllCustomers, 
  getCustomerById, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer 
} from './customerController';
import { Request, Response } from 'express';

const db = require('../../models');
jest.mock('../../models', () => ({
  Customer: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

describe('Customer Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

 
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
    it('should return all customers with status 200 (implied)', async () => {
      const mockCustomers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      (db.Customer.findAll as jest.Mock).mockResolvedValue(mockCustomers);

      await getAllCustomers(req as Request, res as Response);

      expect(db.Customer.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockCustomers);
    });

    it('should handle errors', async () => {
      const error = new Error('DB Error');
      (db.Customer.findAll as jest.Mock).mockRejectedValue(error);

      await getAllCustomers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting customers', error });
    });
  });

  // --- Test: getCustomerById ---
  describe('getCustomerById', () => {
    it('should return a customer if found', async () => {
      req.params = { id: '1' };
      const mockCustomer = { id: 1, name: 'John' };
      (db.Customer.findByPk as jest.Mock).mockResolvedValue(mockCustomer);

      await getCustomerById(req as Request, res as Response);

      expect(db.Customer.findByPk).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(mockCustomer);
    });

    it('should return 404 if customer not found', async () => {
      req.params = { id: '999' };
      (db.Customer.findByPk as jest.Mock).mockResolvedValue(null);

      await getCustomerById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Customer not found' });
    });
  });

  // --- Test: createCustomer ---
  describe('createCustomer', () => {
    it('should create a customer and return 201', async () => {
      const newCustomerData = { name: 'Doe', email: 'd@test.com', contactNo: '123' };
      req.body = newCustomerData;
      
      const createdCustomer = { id: 1, ...newCustomerData };
      (db.Customer.create as jest.Mock).mockResolvedValue(createdCustomer);

      await createCustomer(req as Request, res as Response);

      expect(db.Customer.create).toHaveBeenCalledWith(newCustomerData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdCustomer);
    });
  });

  // --- Test: updateCustomer ---
  describe('updateCustomer', () => {
    it('should update a customer if found', async () => {
      req.params = { id: '1' };
      req.body = { name: 'Updated Name' };

      
      const mockUpdateFn = jest.fn();
      const mockCustomerInstance = { 
        id: 1, 
        name: 'Old Name', 
        update: mockUpdateFn 
      };

      (db.Customer.findByPk as jest.Mock).mockResolvedValue(mockCustomerInstance);

      await updateCustomer(req as Request, res as Response);

      expect(db.Customer.findByPk).toHaveBeenCalledWith('1');
      expect(mockCustomerInstance.update).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(mockCustomerInstance);
    });

    it('should return 404 if customer to update is not found', async () => {
      req.params = { id: '999' };
      (db.Customer.findByPk as jest.Mock).mockResolvedValue(null);

      await updateCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

 
  describe('deleteCustomer', () => {
    it('should delete a customer if found', async () => {
      req.params = { id: '1' };

      
      const mockDestroyFn = jest.fn();
      const mockCustomerInstance = { 
        id: 1, 
        destroy: mockDestroyFn 
      };

      (db.Customer.findByPk as jest.Mock).mockResolvedValue(mockCustomerInstance);

      await deleteCustomer(req as Request, res as Response);

      expect(mockCustomerInstance.destroy).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Customer deleted successfully' });
    });

    it('should return 404 if customer to delete is not found', async () => {
      req.params = { id: '999' };
      (db.Customer.findByPk as jest.Mock).mockResolvedValue(null);

      await deleteCustomer(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});