import { 
  getAllManagers, 
  getManagerById, 
  createManager, 
  updateManager, 
  deleteManager 
} from './speciesManagerController';
import { Request, Response } from 'express';


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

  // --- Test: getAllManagers ---
  describe('getAllManagers', () => {
    it('should return all managers with managedSpecies info', async () => {
      const mockManagers = [
        { id: 1, name: 'Dr. Smith', managedSpecies: { name: 'Space Dog' } }
      ];
      (db.Species_Manager.findAll as jest.Mock).mockResolvedValue(mockManagers);

      await getAllManagers(req as Request, res as Response);

      // Verify the include was passed correctly
      expect(db.Species_Manager.findAll).toHaveBeenCalledWith({
        include: [{
          model: db.Pets,
          as: 'managedSpecies'
        }]
      });
      expect(res.json).toHaveBeenCalledWith(mockManagers);
    });

    it('should handle errors', async () => {
      const error = new Error('DB Error');
      (db.Species_Manager.findAll as jest.Mock).mockRejectedValue(error);

      await getAllManagers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting managers', error });
    });
  });

  // --- Test: getManagerById ---
  describe('getManagerById', () => {
    it('should return a manager if found', async () => {
      req.params = { id: '1' };
      const mockManager = { id: 1, name: 'Dr. Smith' };
      
      (db.Species_Manager.findByPk as jest.Mock).mockResolvedValue(mockManager);

      await getManagerById(req as Request, res as Response);

      expect(db.Species_Manager.findByPk).toHaveBeenCalledWith('1', {
        include: [{
          model: db.Pets,
          as: 'managedSpecies'
        }]
      });
      expect(res.json).toHaveBeenCalledWith(mockManager);
    });

    it('should return 404 if manager not found', async () => {
      req.params = { id: '999' };
      (db.Species_Manager.findByPk as jest.Mock).mockResolvedValue(null);

      await getManagerById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Manager not found' });
    });
  });

  // --- Test: createManager ---
  describe('createManager', () => {
    it('should create a manager and return 201', async () => {
      req.body = { 
        petId: 1, 
        name: 'Jane Doe', 
        role: 'Veterinarian', 
        email: 'jane@zoo.com' 
      };
      
      const createdManager = { id: 1, ...req.body };
      (db.Species_Manager.create as jest.Mock).mockResolvedValue(createdManager);

      await createManager(req as Request, res as Response);

      expect(db.Species_Manager.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdManager);
    });

    it('should handle creation errors', async () => {
        const error = new Error('Creation failed');
        (db.Species_Manager.create as jest.Mock).mockRejectedValue(error);
  
        await createManager(req as Request, res as Response);
  
        expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // --- Test: updateManager ---
  describe('updateManager', () => {
    it('should update a manager if found', async () => {
      req.params = { id: '1' };
      req.body = { name: 'Jane Updated', role: 'Head Vet' };

      const mockUpdateFn = jest.fn();
      const mockManagerInstance = { 
        id: 1, 
        name: 'Jane Doe', 
        update: mockUpdateFn 
      };

      (db.Species_Manager.findByPk as jest.Mock).mockResolvedValue(mockManagerInstance);

      await updateManager(req as Request, res as Response);

      expect(mockManagerInstance.update).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(mockManagerInstance);
    });

    it('should return 404 if manager to update is not found', async () => {
      req.params = { id: '999' };
      (db.Species_Manager.findByPk as jest.Mock).mockResolvedValue(null);

      await updateManager(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: deleteManager ---
  describe('deleteManager', () => {
    it('should delete a manager if found', async () => {
      req.params = { id: '1' };
      const mockDestroyFn = jest.fn();
      const mockManagerInstance = { 
        id: 1, 
        destroy: mockDestroyFn 
      };

      (db.Species_Manager.findByPk as jest.Mock).mockResolvedValue(mockManagerInstance);

      await deleteManager(req as Request, res as Response);

      expect(mockManagerInstance.destroy).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Manager deleted successfully' });
    });

    it('should return 404 if manager to delete is not found', async () => {
      req.params = { id: '999' };
      (db.Species_Manager.findByPk as jest.Mock).mockResolvedValue(null);

      await deleteManager(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});