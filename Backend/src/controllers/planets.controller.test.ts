import { 
  getAllPlanets, 
  getPlanetById, 
  createPlanet, 
  updatePlanet, 
  deletePlanet 
} from './planetsController';
import { Request, Response } from 'express';


const db = require('../../models');

jest.mock('../../models', () => ({
  Planets: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Pets: { 

    name: 'MockPetModel' 
  },
}));

describe('Planets Controller', () => {
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

  // --- Test: getAllPlanets ---
  describe('getAllPlanets', () => {
    it('should return all planets', async () => {
      const mockPlanets = [
        { id: 1, planetName: 'Earth', distanceFromSun: 1 },
        { id: 2, planetName: 'Mars', distanceFromSun: 1.5 }
      ];
      (db.Planets.findAll as jest.Mock).mockResolvedValue(mockPlanets);

      await getAllPlanets(req as Request, res as Response);

      expect(db.Planets.findAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockPlanets);
    });

    it('should handle errors', async () => {
      const error = new Error('DB Error');
      (db.Planets.findAll as jest.Mock).mockRejectedValue(error);

      await getAllPlanets(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Error getting planets', error });
    });
  });

  // --- Test: getPlanetById ---
  describe('getPlanetById', () => {
    it('should return a planet with nativePets if found', async () => {
      req.params = { id: '1' };
      const mockPlanet = { 
        id: 1, 
        planetName: 'Mars', 
        nativePets: [] 
      };
      
      (db.Planets.findByPk as jest.Mock).mockResolvedValue(mockPlanet);

      await getPlanetById(req as Request, res as Response);

      // Verify strict check on how findByPk was called (including the association)
      expect(db.Planets.findByPk).toHaveBeenCalledWith('1', {
        include: [{
          model: db.Pets,
          as: 'nativePets'
        }]
      });
      expect(res.json).toHaveBeenCalledWith(mockPlanet);
    });

    it('should return 404 if planet not found', async () => {
      req.params = { id: '999' };
      (db.Planets.findByPk as jest.Mock).mockResolvedValue(null);

      await getPlanetById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Planet not found' });
    });
  });

  // --- Test: createPlanet ---
  describe('createPlanet', () => {
    it('should create a planet and return 201', async () => {
      req.body = { planetName: 'Jupiter', distanceFromSun: 5.2 };
      
      const createdPlanet = { id: 1, ...req.body };
      (db.Planets.create as jest.Mock).mockResolvedValue(createdPlanet);

      await createPlanet(req as Request, res as Response);

      expect(db.Planets.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdPlanet);
    });

    it('should handle creation errors', async () => {
        const error = new Error('Creation failed');
        (db.Planets.create as jest.Mock).mockRejectedValue(error);
  
        await createPlanet(req as Request, res as Response);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Error creating planet', error });
      });
  });

  // --- Test: updatePlanet ---
  describe('updatePlanet', () => {
    it('should update a planet if found', async () => {
      req.params = { id: '1' };
      req.body = { planetName: 'New Earth', distanceFromSun: 1.1 };

      const mockUpdateFn = jest.fn();
      const mockPlanetInstance = { 
        id: 1, 
        planetName: 'Earth', 
        update: mockUpdateFn 
      };

      (db.Planets.findByPk as jest.Mock).mockResolvedValue(mockPlanetInstance);

      await updatePlanet(req as Request, res as Response);

      expect(mockPlanetInstance.update).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(mockPlanetInstance);
    });

    it('should return 404 if planet to update is not found', async () => {
      req.params = { id: '999' };
      (db.Planets.findByPk as jest.Mock).mockResolvedValue(null);

      await updatePlanet(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // --- Test: deletePlanet ---
  describe('deletePlanet', () => {
    it('should delete a planet if found', async () => {
      req.params = { id: '1' };
      const mockDestroyFn = jest.fn();
      const mockPlanetInstance = { 
        id: 1, 
        destroy: mockDestroyFn 
      };

      (db.Planets.findByPk as jest.Mock).mockResolvedValue(mockPlanetInstance);

      await deletePlanet(req as Request, res as Response);

      expect(mockPlanetInstance.destroy).toHaveBeenCalled();
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Planet deleted successfully' });
    });

    it('should return 404 if planet to delete is not found', async () => {
      req.params = { id: '999' };
      (db.Planets.findByPk as jest.Mock).mockResolvedValue(null);

      await deletePlanet(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});