import { Request, Response } from 'express';
const db = require('../../models');

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await db.Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error getting customers', error });
  }
};

// Get one customer by ID
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error getting customer', error });
  }
};

// Create new customer
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, contactNo } = req.body;
    const customer = await db.Customer.create({
      name,
      email,
      contactNo
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error });
  }
};

// Update customer
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, contactNo } = req.body;
    const customer = await db.Customer.findByPk(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    await customer.update({ name, email, contactNo });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error });
  }
};

// Delete customer
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    await customer.destroy();
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error });
  }
};