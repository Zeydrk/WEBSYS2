import { 
  getAllCarts, 
  getCartById, 
  createCart, 
  addItemToCart, 
  updateCartItemQuantity, 
  removeItemFromCart 
} from './cartController';
import { Request, Response } from 'express';

const db = require('../../models');
jest.mock('../../models', () => ({
  Cart: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Cart_Item: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Pets: {
    findByPk: jest.fn(),
  }
}));

describe('Cart Controller', () => {
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

  // --- Test: addItemToCart ---
  describe('addItemToCart', () => {
    it('should create new item if not in cart', async () => {
      req.params = { id: '1' }; // Cart ID
      req.body = { petId: 5, quantity: 2 };

      (db.Cart.findByPk as jest.Mock).mockResolvedValue({ id: 1 }); // Cart exists
      (db.Pets.findByPk as jest.Mock).mockResolvedValue({ id: 5 }); // Pet exists
      (db.Cart_Item.findOne as jest.Mock).mockResolvedValue(null); // Item not in cart yet

      const mockNewItem = { cartId: 1, petId: 5, quantity: 2 };
      (db.Cart_Item.create as jest.Mock).mockResolvedValue(mockNewItem);

      await addItemToCart(req as Request, res as Response);

      expect(db.Cart_Item.create).toHaveBeenCalledWith(expect.objectContaining({ quantity: 2 }));
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should update quantity if item already exists', async () => {
      req.params = { id: '1' };
      req.body = { petId: 5, quantity: 1 };

      (db.Cart.findByPk as jest.Mock).mockResolvedValue({ id: 1 });
      (db.Pets.findByPk as jest.Mock).mockResolvedValue({ id: 5 });

      const mockUpdate = jest.fn();
      const mockExistingItem = { quantity: 2, update: mockUpdate };
      (db.Cart_Item.findOne as jest.Mock).mockResolvedValue(mockExistingItem);

      await addItemToCart(req as Request, res as Response);

      // 2 existing + 1 new = 3
      expect(mockExistingItem.update).toHaveBeenCalledWith({ quantity: 3 });
      expect(res.json).toHaveBeenCalledWith(mockExistingItem);
    });

    it('should return 404 if cart or pet not found', async () => {
      req.params = { id: '999' };
      req.body = { petId: 5, quantity: 1 };
      (db.Cart.findByPk as jest.Mock).mockResolvedValue(null);

      await addItemToCart(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: updateCartItemQuantity ---
  describe('updateCartItemQuantity', () => {
    it('should update quantity', async () => {
      req.params = { cartId: '1', itemId: '10' };
      req.body = { quantity: 5 };

      const mockUpdate = jest.fn();
      (db.Cart_Item.findOne as jest.Mock).mockResolvedValue({ update: mockUpdate });

      await updateCartItemQuantity(req as Request, res as Response);

      expect(mockUpdate).toHaveBeenCalledWith({ quantity: 5 });
    });

    it('should destroy item if quantity is 0', async () => {
      req.params = { cartId: '1', itemId: '10' };
      req.body = { quantity: 0 };

      const mockDestroy = jest.fn();
      (db.Cart_Item.findOne as jest.Mock).mockResolvedValue({ destroy: mockDestroy });

      await updateCartItemQuantity(req as Request, res as Response);

      expect(mockDestroy).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: 'Item removed from cart' });
    });
  });

  // --- Test: removeItemFromCart ---
  describe('removeItemFromCart', () => {
    it('should delete item if found', async () => {
      req.params = { cartId: '1', itemId: '10' };
      const mockDestroy = jest.fn();
      (db.Cart_Item.findOne as jest.Mock).mockResolvedValue({ destroy: mockDestroy });

      await removeItemFromCart(req as Request, res as Response);

      expect(mockDestroy).toHaveBeenCalled();
    });
  });
});