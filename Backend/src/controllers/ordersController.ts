import { Request, Response } from 'express';
const getDb = () => require('../../models');

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getDb().Orders.findAll({
      include: [
        {
          model: getDb().Customer,
          as: 'customer'
        },
        {
          model: getDb().Logistics,
          as: 'logisticsProvider'
        },
        {
          model: getDb().Pets,
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
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await getDb().Orders.findByPk(req.params.id, {
      include: [
        {
          model: getDb().Customer,
          as: 'customer'
        },
        {
          model: getDb().Logistics,
          as: 'logisticsProvider'
        },
        {
          model: getDb().Pets,
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
export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      customerId,
      logisticsId,
      deliveryPlanet,
      items 
    } = req.body;

    // Validate input
    if (!customerId || !logisticsId || !deliveryPlanet) {
      return res.status(400).json({ message: 'Missing required fields: customerId, logisticsId, deliveryPlanet' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required and must not be empty' });
    }

    // Validate customer exists
    const customer = await getDb().Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: `Customer ${customerId} not found` });
    }

    // Fetch logistics provider once (outside the loop)
    const logistics = await getDb().Logistics.findByPk(logisticsId);
    if (!logistics) {
      return res.status(404).json({ message: `Logistics provider ${logisticsId} not found` });
    }

    // Calculate total cost
    let totalCost = 0;
    const orderItems = [];

    for (const item of items) {
      // Validate item structure
      if (!item.petId || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({ message: 'Each item must have petId and quantity > 0' });
      }

      const pet = await getDb().Pets.findByPk(item.petId);
      
      if (!pet) {
        return res.status(404).json({ message: `Pet ${item.petId} not found` });
      }
      
      // Check stock
      if (pet.stockQty < item.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${pet.name}. Available: ${pet.stockQty}` 
        });
      }

      const transportCost = parseFloat(pet.basePrice) * parseFloat(logistics.delivery_rate);
      const itemTotal = (parseFloat(pet.basePrice) + transportCost) * item.quantity;
      
      totalCost += itemTotal;
      
      orderItems.push({
        petId: item.petId,
        quantity: item.quantity,
        speciesBaseCost: parseFloat(pet.basePrice),
        transportCostApplied: transportCost,
        finalItemCost: itemTotal
      });
    }

    // Calculate estimated delivery (example: 5 days from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    // Create order
    const order = await getDb().Orders.create({
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
      await getDb().Order_Pets.create({
        orderId: order.orderId,
        ...item
      });
      
      const pet = await getDb().Pets.findByPk(item.petId);
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
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await getDb().Orders.findByPk(req.params.id);
    
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
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await getDb().Orders.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};