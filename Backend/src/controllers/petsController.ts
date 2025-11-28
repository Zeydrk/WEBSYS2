import { Request, Response } from 'express';
const db = require('../../models');

// Get all pets with their planet info
export const getAllPets = async (req, res) => {
  try {
    const pets = await db.Pets.findAll({
      include: [{
        model: db.Planets,
        as: 'originPlanet'
      }]
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: 'Error getting pets', error });
  }
};

// Get one pet by ID
export const getPetById = async (req, res) => {
  try {
    const pet = await db.Pets.findByPk(req.params.id, {
      include: [{
        model: db.Planets,
        as: 'originPlanet'
      }]
    });
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error getting pet', error });
  }
};

// Create new pet
export const createPet = async (req, res) => {
  try {
    const { planetId, name, species, description, basePrice, stockQty } = req.body;
    
    const pet = await db.Pets.create({
      planetId,
      name,
      species,
      description,
      basePrice,
      stockQty
    });
    
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating pet', error });
  }
};

// Update pet
export const updatePet = async (req, res) => {
  try {
    const { planetId, name, species, description, basePrice, stockQty } = req.body;
    const pet = await db.Pets.findByPk(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    await pet.update({
      planetId,
      name,
      species,
      description,
      basePrice,
      stockQty
    });
    
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating pet', error });
  }
};

// Delete pet
export const deletePet = async (req, res) => {
  try {
    const pet = await db.Pets.findByPk(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    await pet.destroy();
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet', error });
  }
};

// Update stock quantity
export const updateStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const pet = await db.Pets.findByPk(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    
    await pet.update({ stockQty: quantity });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock', error });
  }
};