import { Request, Response } from 'express';
const db = require('../../models');

// Get all logistics providers
export const getAllLogistics = async (req, res) => {
  try {
    const logistics = await db.Logistics.findAll();
    res.json(logistics);
  } catch (error) {
    res.status(500).json({ message: 'Error getting logistics', error });
  }
};

// Get one logistics provider by ID
export const getLogisticsById = async (req, res) => {
  try {
    const logistics = await db.Logistics.findByPk(req.params.id);
    
    if (!logistics) {
      return res.status(404).json({ message: 'Logistics provider not found' });
    }
    
    res.json(logistics);
  } catch (error) {
    res.status(500).json({ message: 'Error getting logistics', error });
  }
};

// Create new logistics provider
export const createLogistics = async (req, res) => {
  try {
    const { name, delivery_rate } = req.body;
    
    const logistics = await db.Logistics.create({
      name,
      delivery_rate
    });
    
    res.status(201).json(logistics);
  } catch (error) {
    res.status(500).json({ message: 'Error creating logistics', error });
  }
};

// Update logistics provider
export const updateLogistics = async (req, res) => {
  try {
    const { name, delivery_rate } = req.body;
    const logistics = await db.Logistics.findByPk(req.params.id);
    
    if (!logistics) {
      return res.status(404).json({ message: 'Logistics provider not found' });
    }
    
    await logistics.update({ name, delivery_rate });
    res.json(logistics);
  } catch (error) {
    res.status(500).json({ message: 'Error updating logistics', error });
  }
};

// Delete logistics provider
export const deleteLogistics = async (req, res) => {
  try {
    const logistics = await db.Logistics.findByPk(req.params.id);
    
    if (!logistics) {
      return res.status(404).json({ message: 'Logistics provider not found' });
    }
    
    await logistics.destroy();
    res.json({ message: 'Logistics provider deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting logistics', error });
  }
};