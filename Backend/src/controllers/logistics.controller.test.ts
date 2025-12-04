import { 
  getAllLogistics, 
  getLogisticsById, 
  createLogistics, 
  updateLogistics, 
  deleteLogistics 
} from './logisticsController';
import { Request, Response } from 'express';


const db = require('../../models');
jest.mock('../../models', () => ({
  Logistics: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

describe('Logistics Controller', () => {
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

  // --- Test: getAllLogistics ---
  describe('getAllLogistics', () => {
    it('should return all logistics providers', async () => {
      const mockLogistics = [
        { id: 1, name: 'DHL', delivery_rate: 50 }, 
        { id: 2, name: 'FedEx', delivery_rate: 60 }
      ];
      (db.Logistics.findAll as jest.Mock).mockResolvedValue(mockLogistics);

      await getAllLogistics(req as Request, res as Response);

      expect(db.Logistics.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockLogistics);
    });

    it('should handle errors with 500 status', async () => {
      const error = new Error('DB Error');
      (db.Logistics.findAll as jest.Mock).mockRejectedValue(error);

      await getAllLogistics(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting logistics', error });
    });
  });

  // --- Test: getLogisticsById ---
  describe('getLogisticsById', () => {
    it('should return a provider if found', async () => {
      req.params = { id: '1' };
      const mockProvider = { id: 1, name: 'DHL', delivery_rate: 50 };
      (db.Logistics.findByPk as jest.Mock).mockResolvedValue(mockProvider);

      await getLogisticsById(req as Request, res as Response);

      expect(db.Logistics.findByPk).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(mockProvider);
    });

    it('should return 404 if provider not found', async () => {
      req.params = { id: '999' };
      (db.Logistics.findByPk as jest.Mock).mockResolvedValue(null);

      await getLogisticsById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Logistics provider not found' });
    });
  });

  // --- Test: createLogistics ---
  describe('createLogistics', () => {
    it('should create a provider and return 201', async () => {
      const newProviderData = { name: 'UPS', delivery_rate: 55 };
      req.body = newProviderData;
      
      const createdProvider = { id: 1, ...newProviderData };
      (db.Logistics.create as jest.Mock).mockResolvedValue(createdProvider);

      await createLogistics(req as Request, res as Response);

      expect(db.Logistics.create).toHaveBeenCalledWith(newProviderData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdProvider);
    });
  });

  // --- Test: updateLogistics ---
  describe('updateLogistics', () => {
    it('should update a provider if found', async () => {
      req.params = { id: '1' };
      req.body = { name: 'DHL Express', delivery_rate: 52 };

     
      const mockUpdateFn = jest.fn(); 
      const mockProviderInstance = { 
        id: 1, 
        name: 'DHL', 
        delivery_rate: 50,
        update: mockUpdateFn 
      };

      (db.Logistics.findByPk as jest.Mock).mockResolvedValue(mockProviderInstance);

      await updateLogistics(req as Request, res as Response);

      expect(db.Logistics.findByPk).toHaveBeenCalledWith('1');
      
      expect(mockProviderInstance.update).toHaveBeenCalledWith(req.body); 
      expect(res.json).toHaveBeenCalledWith(mockProviderInstance);
    });

    it('should return 404 if provider to update is not found', async () => {
      req.params = { id: '999' };
      (db.Logistics.findByPk as jest.Mock).mockResolvedValue(null);

      await updateLogistics(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: deleteLogistics ---
  describe('deleteLogistics', () => {
    it('should delete a provider if found', async () => {
      req.params = { id: '1' };

      
      const mockDestroyFn = jest.fn();
      const mockProviderInstance = { 
        id: 1, 
        destroy: mockDestroyFn 
      };

      (db.Logistics.findByPk as jest.Mock).mockResolvedValue(mockProviderInstance);

      await deleteLogistics(req as Request, res as Response);

      expect(mockProviderInstance.destroy).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Logistics provider deleted successfully' });
    });

    it('should return 404 if provider to delete is not found', async () => {
      req.params = { id: '999' };
      (db.Logistics.findByPk as jest.Mock).mockResolvedValue(null);

      await deleteLogistics(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});