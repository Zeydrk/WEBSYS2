import { Request, Response } from 'express';
const getDb = () => require('../../models');

// Get all species managers
export const getAllManagers = async (req: Request, res: Response) => {
  try {
    const managers = await getDb().Species_Manager.findAll({
      include: [{
        model: getDb().Pets,
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
    const manager = await getDb().Species_Manager.findByPk(req.params.id, {
      include: [{
        model: getDb().Pets,
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
export const createManager = async (req: Request, res: Response) => {
  try {
    const { petId, name, role, email } = req.body;
    
    const manager = await getDb().Species_Manager.create({
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
export const updateManager = async (req: Request, res: Response) => {
  try {
    const { petId, name, role, email } = req.body;
    const manager = await getDb().Species_Manager.findByPk(req.params.id);
    
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
export const deleteManager = async (req: Request, res: Response) => {
  try {
    const manager = await getDb().Species_Manager.findByPk(req.params.id);
    
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    
    await manager.destroy();
    res.json({ message: 'Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting manager', error });
  }
};