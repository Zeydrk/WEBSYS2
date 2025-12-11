import { Request, Response } from 'express';
const getDb = () => require('../../models');

// Get all carts with items
export const getAllCarts = async (_req: Request, res: Response) => {
  try {
    const carts = await getDb().Cart.findAll({
      include: [
        {
          model: getDb().Cart_Item,
          as: 'items',
          include: [{ model: getDb().Pets, as: 'pet' }]
        }
      ]
    });
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting carts', error });
  }
};

// Get cart by id
export const getCartById = async (req: Request, res: Response) => {
  try {
    const cart = await getDb().Cart.findByPk(req.params.id, {
      include: [
        {
          model: getDb().Cart_Item,
          as: 'items',
          include: [{ model: getDb().Pets, as: 'pet' }]
        }
      ]
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error getting cart', error });
  }
};

// Create a new cart
export const createCart = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.body;

    const cart = await getDb().Cart.create({
      customerId,
      status: 'active'
    });

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cart', error });
  }
};

// Add or increment an item in a cart
export const addItemToCart = async (req: Request, res: Response) => {
  try {
    const { petId, quantity } = req.body;
    const { id: cartId } = req.params;

    if (!petId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'petId and quantity > 0 are required' });
    }

    const cart = await getDb().Cart.findByPk(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const pet = await getDb().Pets.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const existingItem = await getDb().Cart_Item.findOne({
      where: { cartId, petId }
    });

    if (existingItem) {
      await existingItem.update({ quantity: existingItem.quantity + quantity });
      return res.json(existingItem);
    }

    const newItem = await getDb().Cart_Item.create({
      cartId,
      petId,
      quantity
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// Update a cart item's quantity
export const updateCartItemQuantity = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const { cartId, itemId } = req.params;

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ message: 'quantity must be 0 or greater' });
    }

    const item = await getDb().Cart_Item.findOne({
      where: { cartItemId: itemId, cartId }
    });

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (quantity === 0) {
      await item.destroy();
      return res.json({ message: 'Item removed from cart' });
    }

    await item.update({ quantity });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req: Request, res: Response) => {
  try {
    const { cartId, itemId } = req.params;

    const item = await getDb().Cart_Item.findOne({
      where: { cartItemId: itemId, cartId }
    });

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await item.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart item', error });
  }
};

// Update cart status
export const updateCartStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const cart = await getDb().Cart.findByPk(id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    await cart.update({ status: status ?? cart.status });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart status', error });
  }
};

