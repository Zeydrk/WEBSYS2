import { 
  getAllAccounts, 
  getAccountById, 
  createAccount, 
  updateAccount, 
  deleteAccount 
} from './accountsController';
import { Request, Response } from 'express';

const db = require('../../models');
jest.mock('../../models', () => ({
  Account: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Customer: {
    findByPk: jest.fn(),
  }
}));

describe('Accounts Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = { params: {}, body: {} };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock };
    jest.clearAllMocks();
  });

  // --- Test: createAccount ---
  describe('createAccount', () => {
    it('should create an account if customer exists and email is unique', async () => {
      req.body = { customerId: 1, email: 'new@test.com', passwordHash: 'hash' };
      
      // 1. Check uniqueness (returns null = unique)
      (db.Account.findOne as jest.Mock).mockResolvedValue(null);
      // 2. Check customer exists
      (db.Customer.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
      // 3. Create
      const mockCreated = { id: 1, ...req.body };
      (db.Account.create as jest.Mock).mockResolvedValue(mockCreated);

      await createAccount(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockCreated);
    });

    it('should return 409 if email already exists', async () => {
      req.body = { customerId: 1, email: 'exists@test.com', passwordHash: 'hash' };
      (db.Account.findOne as jest.Mock).mockResolvedValue({ id: 5 }); // Exists

      await createAccount(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Email already has an account' });
    });

    it('should return 404 if customer does not exist', async () => {
      req.body = { customerId: 99, email: 'new@test.com', passwordHash: 'hash' };
      (db.Account.findOne as jest.Mock).mockResolvedValue(null); // Email ok
      (db.Customer.findByPk as jest.Mock).mockResolvedValue(null); // Customer missing

      await createAccount(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: updateAccount ---
  describe('updateAccount', () => {
    it('should update account details', async () => {
      req.params = { id: '1' };
      req.body = { role: 'admin' };

      const mockUpdate = jest.fn();
      const mockAccount = { id: 1, role: 'user', username: 'test', update: mockUpdate };
      (db.Account.findByPk as jest.Mock).mockResolvedValue(mockAccount);

      await updateAccount(req as Request, res as Response);

      expect(mockAccount.update).toHaveBeenCalledWith(expect.objectContaining({ role: 'admin' }));
      expect(res.json).toHaveBeenCalledWith(mockAccount);
    });
  });

  // --- Test: deleteAccount ---
  describe('deleteAccount', () => {
    it('should delete account if found', async () => {
      req.params = { id: '1' };
      const mockDestroy = jest.fn();
      (db.Account.findByPk as jest.Mock).mockResolvedValue({ destroy: mockDestroy });

      await deleteAccount(req as Request, res as Response);

      expect(mockDestroy).toHaveBeenCalled();
    });
  });
});