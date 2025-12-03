import { 
  getAllPets, 
  getPetById, 
  createPet, 
  updatePet, 
  deletePet, 
  updateStock 
} from './petsController'; 
import { Request, Response } from 'express';


const db = require('../../models');

jest.mock('../../models', () => ({
  Pets: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Planets: { name: 'MockPlanetModel' }, 
}));

describe('Pets Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = { params: {}, body: {} }; // Initialize with empty objects
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    res = {
      json: jsonMock,
      status: statusMock,
    };
    
    jest.clearAllMocks();
  });

  // --- Test: getAllPets ---
  describe('getAllPets', () => {
    it('should return all pets with planet info', async () => {
      const mockPets = [{ id: 1, name: 'Space Dog', originPlanet: { name: 'Mars' } }];
      (db.Pets.findAll as jest.Mock).mockResolvedValue(mockPets);

      await getAllPets(req as Request, res as Response);

      // Verify it was called with the correct include options
      expect(db.Pets.findAll).toHaveBeenCalledWith({
        include: [{
          model: db.Planets,
          as: 'originPlanet'
        }]
      });
      expect(res.json).toHaveBeenCalledWith(mockPets);
    });

    it('should handle errors', async () => {
      const error = new Error('DB Error');
      (db.Pets.findAll as jest.Mock).mockRejectedValue(error);

      await getAllPets(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting pets', error });
    });
  });

  // --- Test: getPetById ---
  describe('getPetById', () => {
    it('should return a pet if found', async () => {
      req.params = { id: '1' };
      const mockPet = { id: 1, name: 'Alien Cat' };
      (db.Pets.findByPk as jest.Mock).mockResolvedValue(mockPet);

      await getPetById(req as Request, res as Response);

      // Verify findByPk includes the association
      expect(db.Pets.findByPk).toHaveBeenCalledWith('1', {
        include: [{
          model: db.Planets,
          as: 'originPlanet'
        }]
      });
      expect(res.json).toHaveBeenCalledWith(mockPet);
    });

    it('should return 404 if pet not found', async () => {
      req.params = { id: '999' };
      (db.Pets.findByPk as jest.Mock).mockResolvedValue(null);

      await getPetById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Pet not found' });
    });
  });

  // --- Test: createPet ---
  describe('createPet', () => {
    it('should create a pet and return 201', async () => {
      req.body = { 
        planetId: 1, 
        name: 'Moon Rabbit', 
        species: 'Rabbit', 
        basePrice: 100, 
        stockQty: 10 
      };
      
      const createdPet = { id: 1, ...req.body };
      (db.Pets.create as jest.Mock).mockResolvedValue(createdPet);

      await createPet(req as Request, res as Response);

      expect(db.Pets.create).toHaveBeenCalledWith(req.body); 
      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdPet);
    });
  });

  // --- Test: updatePet ---
  describe('updatePet', () => {
    it('should update a pet if found', async () => {
      req.params = { id: '1' };
      req.body = { name: 'Updated Name', stockQty: 20 };

      const mockUpdateFn = jest.fn();
      const mockPetInstance = { id: 1, update: mockUpdateFn };

      (db.Pets.findByPk as jest.Mock).mockResolvedValue(mockPetInstance);

      await updatePet(req as Request, res as Response);

      expect(mockPetInstance.update).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(mockPetInstance);
    });

    it('should return 404 if pet to update is not found', async () => {
      req.params = { id: '999' };
      (db.Pets.findByPk as jest.Mock).mockResolvedValue(null);

      await updatePet(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: updateStock (Specific Feature) ---
  describe('updateStock', () => {
    it('should update only the stock quantity', async () => {
      req.params = { id: '1' };
      req.body = { quantity: 50 };

      const mockUpdateFn = jest.fn();
      const mockPetInstance = { 
        id: 1, 
        name: 'Pet', 
        stockQty: 10, 
        update: mockUpdateFn 
      };

      (db.Pets.findByPk as jest.Mock).mockResolvedValue(mockPetInstance);

      await updateStock(req as Request, res as Response);

      expect(db.Pets.findByPk).toHaveBeenCalledWith('1');
      // Crucial: Check that update was called with 'stockQty', mapped from 'quantity'
      expect(mockPetInstance.update).toHaveBeenCalledWith({ stockQty: 50 });
      expect(res.json).toHaveBeenCalledWith(mockPetInstance);
    });

    it('should return 404 if pet for stock update is not found', async () => {
      req.params = { id: '999' };
      (db.Pets.findByPk as jest.Mock).mockResolvedValue(null);

      await updateStock(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: deletePet ---
  describe('deletePet', () => {
    it('should delete a pet if found', async () => {
      req.params = { id: '1' };
      const mockDestroyFn = jest.fn();
      const mockPetInstance = { id: 1, destroy: mockDestroyFn };

      (db.Pets.findByPk as jest.Mock).mockResolvedValue(mockPetInstance);

      await deletePet(req as Request, res as Response);

      expect(mockPetInstance.destroy).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Pet deleted successfully' });
    });
  });
});