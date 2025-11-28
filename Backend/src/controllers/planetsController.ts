import { Request, Response } from 'express';
const db = require('../../models');

// Get all planets
export const getAllPlanets = async (req, res) => {
  try {
    const planets = await db.Planets.findAll();
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: 'Error getting planets', error });
  }
};

// Get one planet by ID
export const getPlanetById = async (req, res) => {
  try {
    const planet = await db.Planets.findByPk(req.params.id, {
      include: [{
        model: db.Pets,
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
export const createPlanet = async (req, res) => {
  try {
    const { planetName, distanceFromSun } = req.body;
    
    const planet = await db.Planets.create({
      planetName,
      distanceFromSun
    });
    
    res.status(201).json(planet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating planet', error });
  }
};

// Update planet
export const updatePlanet = async (req, res) => {
  try {
    const { planetName, distanceFromSun } = req.body;
    const planet = await db.Planets.findByPk(req.params.id);
    
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
export const deletePlanet = async (req, res) => {
  try {
    const planet = await db.Planets.findByPk(req.params.id);
    
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    
    await planet.destroy();
    res.json({ message: 'Planet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting planet', error });
  }
};