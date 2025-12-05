import { Request, Response } from 'express';
const getDb = () => require('../../models');

// Get all planets
export const getAllPlanets = async (req: Request, res: Response) => {
  try {
    const planets = await getDb().Planets.findAll();
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: 'Error getting planets', error });
  }
};

// Get one planet by ID
export const getPlanetById = async (req: Request, res: Response) => {
  try {
    const planet = await getDb().Planets.findByPk(req.params.id, {
      include: [{
        model: getDb().Pets,
        as: 'nativePets'
      }]
    });
    
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    
    res.json(planet);
  } catch (error) {
    res.status(500).json({ message: 'Error getting planet', error });
  }
};

// Create new planet
export const createPlanet = async (req: Request, res: Response) => {
  try {
    const { planetName, distanceFromSun } = req.body;
    
    const planet = await getDb().Planets.create({
      planetName,
      distanceFromSun
    });
    
    res.status(201).json(planet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating planet', error });
  }
};

// Update planet
export const updatePlanet = async (req: Request, res: Response) => {
  try {
    const { planetName, distanceFromSun } = req.body;
    const planet = await getDb().Planets.findByPk(req.params.id);
    
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    
    await planet.update({ planetName, distanceFromSun });
    res.json(planet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating planet', error });
  }
};

// Delete planet
export const deletePlanet = async (req: Request, res: Response) => {
  try {
    const planet = await getDb().Planets.findByPk(req.params.id);
    
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    
    await planet.destroy();
    res.json({ message: 'Planet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting planet', error });
  }
};