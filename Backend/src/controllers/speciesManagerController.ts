import { Request, Response } from 'express';
const db = require('../../models');

// Get all species managers
export const getAllManagers = async (req, res) => {
  try {
    const managers = await db.Species_Manager.findAll({
      include: [{
        model: db.Pets,
        as: 'managedSpecies'
      }]
    });
    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: 'Error getting managers', error });
  }
};

// Get one manager by ID
export const getManagerById = async (req: Request, res: Response) => {
  try {
    const manager = await db.Species_Manager.findByPk(req.params.id, {
      include: [{
        model: db.Pets,
        as: 'managedSpecies'
      }]
    });
    
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    
    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: 'Error getting manager', error });
  }
};

// Create new species manager
export const createManager = async (req, res) => {
  try {
    const { petId, name, role, email } = req.body;
    
    const manager = await db.Species_Manager.create({
      petId,
      name,
      role,
      email
    });
    
    res.status(201).json(manager);
  } catch (error) {
    res.status(500).json({ message: 'Error creating manager', error });
  }
};

// Update species manager
export const updateManager = async (req, res) => {
  try {
    const { petId, name, role, email } = req.body;
    const manager = await db.Species_Manager.findByPk(req.params.id);
    
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    
    await manager.update({ petId, name, role, email });
    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: 'Error updating manager', error });
  }
};

// Delete species manager
export const deleteManager = async (req, res) => {
  try {
    const manager = await db.Species_Manager.findByPk(req.params.id);
    
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    
    await manager.destroy();
    res.json({ message: 'Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting manager', error });
  }
};