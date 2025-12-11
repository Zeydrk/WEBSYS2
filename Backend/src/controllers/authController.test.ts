import { login, me } from './authController';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. Mock External Libraries
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// 2. Mock Database
const db = require('../../models');
jest.mock('../../models', () => ({
  Account: {
    findOne: jest.fn(),
    findByPk: jest.fn(),
  },
  Customer: { name: 'MockCustomerModel' }
}));

describe('Auth Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = { body: {} };
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock };
    jest.clearAllMocks();
  });

  // --- Test: login ---
  describe('login', () => {
    it('should return token if credentials are valid', async () => {
      req.body = { email: 'test@test.com', password: 'password123' };
      
      const mockAccount = {
        accountId: 1,
        passwordHash: '$2hash', // Simulate bcrypt hash
        role: 'user',
        update: jest.fn(),
        toJSON: () => ({ accountId: 1, role: 'user', passwordHash: '$2hash' })
      };

      (db.Account.findOne as jest.Mock).mockResolvedValue(mockAccount);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('fake-jwt-token');

      await login(req as Request, res as Response);

      expect(db.Account.findOne).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', '$2hash');
      expect(mockAccount.update).toHaveBeenCalled(); // Checks lastLogin update
      expect(res.json).toHaveBeenCalledWith({
        token: 'fake-jwt-token',
        account: expect.not.objectContaining({ passwordHash: expect.anything() }) // Ensure sensitive data stripped
      });
    });

    it('should return 400 if email or password missing', async () => {
      req.body = { email: 'only_email' };
      await login(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 401 if account not found', async () => {
      req.body = { email: 'wrong@test.com', password: '123' };
      (db.Account.findOne as jest.Mock).mockResolvedValue(null);

      await login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should return 401 if password does not match', async () => {
      req.body = { email: 'test@test.com', password: 'wrong_pass' };
      const mockAccount = { passwordHash: '$2hash' };
      
      (db.Account.findOne as jest.Mock).mockResolvedValue(mockAccount);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await login(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  // --- Test: me ---
  describe('me', () => {
    it('should return account info if authenticated', async () => {
      // Mock the middleware injection of 'auth'
      (req as any).auth = { sub: 1, role: 'user' };

      const mockAccount = {
        accountId: 1,
        role: 'user',
        toJSON: () => ({ accountId: 1, role: 'user' })
      };
      (db.Account.findByPk as jest.Mock).mockResolvedValue(mockAccount);

      await me(req as Request, res as Response);

      expect(db.Account.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
      expect(res.json).toHaveBeenCalledWith({ account: expect.any(Object) });
    });

    it('should return 401 if not authenticated (missing sub)', async () => {
      (req as any).auth = {}; // Empty auth object
      await me(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('should return 404 if account deleted/not found', async () => {
      (req as any).auth = { sub: 999 };
      (db.Account.findByPk as jest.Mock).mockResolvedValue(null);

      await me(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});