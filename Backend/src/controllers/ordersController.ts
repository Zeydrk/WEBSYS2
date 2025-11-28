import { Request, Response } from 'express';
const db = require('../../models');

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await db.Orders.findAll({
      include: [
        {
          model: db.Customer,
          as: 'customer'
        },
        {
          model: db.Logistics,
          as: 'logisticsProvider'
        },
        {
          model: db.Pets,
          as: 'items'
        }
      ]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error getting orders', error });
  }
};

// Get one order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await db.Orders.findByPk(req.params.id, {
      include: [
        {
          model: db.Customer,
          as: 'customer'
        },
        {
          model: db.Logistics,
          as: 'logisticsProvider'
        },
        {
          model: db.Pets,
          as: 'items'
        }
      ]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error getting order', error });
  }
};

// Create new order
export const createOrder = async (req, res) => {
  try {
    const {
      customerId,
      logisticsId,
      deliveryPlanet,
      items 
    } = req.body;

    // Calculate total cost
    let totalCost = 0;
    const orderItems = [];

    for (const item of items) {
      const pet = await db.Pets.findByPk(item.petId);
      
      if (!pet) {
        return res.status(404).json({ message: `Pet ${item.petId} not found` });
      }
      
      // Check stock
      if (pet.stockQty < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${pet.name}. Available: ${pet.stockQty}` 
        });
      }

      const logistics = await db.Logistics.findByPk(logisticsId);
      const transportCost = parseFloat(pet.basePrice) * parseFloat(logistics.delivery_rate);
      const itemTotal = (parseFloat(pet.basePrice) + transportCost) * item.quantity;
      
      totalCost += itemTotal;
      
      orderItems.push({
        petId: item.petId,
        quantity: item.quantity,
        speciesBaseCost: pet.basePrice,
        transportCostApplied: transportCost,
        finalItemCost: itemTotal
      });
    }

    // Calculate estimated delivery (example: 5 days from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    // Create order
    const order = await db.Orders.create({
      customerId,
      logisticsId,
      orderDate: new Date(),
      status: 'Pending',
      totalCost,
      deliveryPlanet,
      estimatedDeliveryDate: estimatedDelivery
    });

    // Create order items and update stock
    for (const item of orderItems) {
      await db.Order_Pets.create({
        orderId: order.orderId,
        ...item
      });
      
      const pet = await db.Pets.findByPk(item.petId);
      await pet.update({
        stockQty: pet.stockQty - item.quantity
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await db.Orders.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await order.update({ status });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await db.Orders.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};