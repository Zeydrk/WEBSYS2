import { 
  getAllOrders, 
  getOrderById, 
  createOrder, 
  updateOrderStatus, 
  deleteOrder 
} from './ordersController';
import { Request, Response } from 'express';


const db = require('../../models');

jest.mock('../../models', () => ({
  Orders: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Customer: { name: 'MockCustomerModel' },
  Logistics: { 
    name: 'MockLogisticsModel',
    findByPk: jest.fn() 
  },
  Pets: { 
    name: 'MockPetsModel',
    findByPk: jest.fn() 
  },
  Order_Pets: {
    create: jest.fn()
  }
}));

describe('Orders Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

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

  // --- Test: getAllOrders ---
  describe('getAllOrders', () => {
    it('should return all orders with associations', async () => {
      const mockOrders = [{ id: 1, totalCost: 500 }];
      (db.Orders.findAll as jest.Mock).mockResolvedValue(mockOrders);

      await getAllOrders(req as Request, res as Response);

      expect(db.Orders.findAll).toHaveBeenCalledWith({
        include: [
          { model: db.Customer, as: 'customer' },
          { model: db.Logistics, as: 'logisticsProvider' },
          { model: db.Pets, as: 'items' }
        ]
      });
      expect(res.json).toHaveBeenCalledWith(mockOrders);
    });

    it('should handle errors', async () => {
      (db.Orders.findAll as jest.Mock).mockRejectedValue(new Error('DB Fail'));
      await getAllOrders(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // --- Test: getOrderById ---
  describe('getOrderById', () => {
    it('should return an order if found', async () => {
      req.params = { id: '1' };
      const mockOrder = { id: 1, status: 'Pending' };
      (db.Orders.findByPk as jest.Mock).mockResolvedValue(mockOrder);

      await getOrderById(req as Request, res as Response);

      expect(db.Orders.findByPk).toHaveBeenCalledWith('1', expect.objectContaining({
        include: expect.any(Array)
      }));
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should return 404 if order not found', async () => {
      req.params = { id: '999' };
      (db.Orders.findByPk as jest.Mock).mockResolvedValue(null);

      await getOrderById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: createOrder (Complex Logic) ---
  describe('createOrder', () => {
    
    const validBody = {
      customerId: 1,
      logisticsId: 1,
      deliveryPlanet: 'Mars',
      items: [{ petId: 1, quantity: 2 }]
    };

    it('should create an order, calculate costs, and update stock successfully', async () => {
      req.body = validBody;

      // 1. Mock Pet Retrieval (Stock check & Cost calculation)
      const mockPetUpdate = jest.fn();
      const mockPet = { 
        id: 1, 
        name: 'Space Dog', 
        basePrice: 100, 
        stockQty: 10, // Enough stock (10 > 2)
        update: mockPetUpdate 
      };
      (db.Pets.findByPk as jest.Mock).mockResolvedValue(mockPet);

      // 2. Mock Logistics Retrieval
      const mockLogistics = { id: 1, delivery_rate: 0.1 }; // 10% shipping
      (db.Logistics.findByPk as jest.Mock).mockResolvedValue(mockLogistics);

      // 3. Mock Order Creation
      const mockCreatedOrder = { 
        orderId: 123, 
        ...req.body, 
        totalCost: 220 
      };
      (db.Orders.create as jest.Mock).mockResolvedValue(mockCreatedOrder);

      // Execute
      await createOrder(req as Request, res as Response);

      // --- Assertions ---
      
      // Calculation Logic check:
      // Base: 100
      // Transport: 100 * 0.1 = 10
      // Item Total: (100 + 10) * 2 = 220
      // Total Cost: 220
      
      // Verify Order Creation
      expect(db.Orders.create).toHaveBeenCalledWith(expect.objectContaining({
        customerId: 1,
        logisticsId: 1,
        totalCost: 220,
        status: 'Pending',
        estimatedDeliveryDate: expect.any(Date)
      }));

      // Verify Junction Table Entry (Order_Pets)
      expect(db.Order_Pets.create).toHaveBeenCalledWith({
        orderId: 123,
        petId: 1,
        quantity: 2,
        speciesBaseCost: 100,
        transportCostApplied: 10,
        finalItemCost: 220
      });

      // Verify Stock Update (10 - 2 = 8)
      expect(mockPet.update).toHaveBeenCalledWith({ stockQty: 8 });

      // Verify Response
      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockCreatedOrder);
    });

    it('should return 404 if a pet in items is not found', async () => {
      req.body = validBody;
      (db.Pets.findByPk as jest.Mock).mockResolvedValue(null); // Pet not found

      await createOrder(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ 
        message: expect.stringContaining('not found') 
      }));
    });

    it('should return 400 if stock is insufficient', async () => {
      req.body = validBody;
      const mockPet = { 
        id: 1, 
        stockQty: 1 // Only 1 left, but requesting 2
      };
      (db.Pets.findByPk as jest.Mock).mockResolvedValue(mockPet);

      await createOrder(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ 
        message: expect.stringContaining('Not enough stock') 
      }));
    });

    it('should handle errors during creation process', async () => {
        req.body = validBody;
        (db.Pets.findByPk as jest.Mock).mockRejectedValue(new Error('Fatal DB Error'));
  
        await createOrder(req as Request, res as Response);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ 
          message: 'Error creating order' 
        }));
      });
  });

  // --- Test: updateOrderStatus ---
  describe('updateOrderStatus', () => {
    it('should update status if order found', async () => {
      req.params = { id: '1' };
      req.body = { status: 'Delivered' };

      const mockUpdateFn = jest.fn();
      const mockOrderInstance = { id: 1, status: 'Pending', update: mockUpdateFn };

      (db.Orders.findByPk as jest.Mock).mockResolvedValue(mockOrderInstance);

      await updateOrderStatus(req as Request, res as Response);

      expect(mockOrderInstance.update).toHaveBeenCalledWith({ status: 'Delivered' });
      expect(res.json).toHaveBeenCalledWith(mockOrderInstance);
    });

    it('should return 404 if order not found', async () => {
      req.params = { id: '999' };
      (db.Orders.findByPk as jest.Mock).mockResolvedValue(null);

      await updateOrderStatus(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: deleteOrder ---
  describe('deleteOrder', () => {
    it('should delete order if found', async () => {
      req.params = { id: '1' };
      const mockDestroyFn = jest.fn();
      const mockOrderInstance = { id: 1, destroy: mockDestroyFn };

      (db.Orders.findByPk as jest.Mock).mockResolvedValue(mockOrderInstance);

      await deleteOrder(req as Request, res as Response);

      expect(mockOrderInstance.destroy).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Order deleted successfully' });
    });

    it('should return 404 if order not found', async () => {
      req.params = { id: '999' };
      (db.Orders.findByPk as jest.Mock).mockResolvedValue(null);

      await deleteOrder(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});