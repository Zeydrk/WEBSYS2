import { Request, Response } from 'express';
const getDb = () => require('../../models');

// Get all accounts with related customer profile
export const getAllAccounts = async (_req: Request, res: Response) => {
  try {
    const accounts = await getDb().Account.findAll({
      include: [
        {
          model: getDb().Customer,
          as: 'customer'
        }
      ]
    });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting accounts', error });
  }
};

// Get single account
export const getAccountById = async (req: Request, res: Response) => {
  try {
    const account = await getDb().Account.findByPk(req.params.id, {
      include: [
        {
          model: getDb().Customer,
          as: 'customer'
        }
      ]
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error getting account', error });
  }
};

// Create account
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { customerId, username, passwordHash, role } = req.body;

    if (!customerId || !username || !passwordHash) {
      return res.status(400).json({ message: 'customerId, username and passwordHash are required' });
    }

    const existing = await getDb().Account.findOne({ where: { username } });
    if (existing) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Ensure the customer exists
    const customer = await getDb().Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found for provided customerId' });
    }

    const account = await getDb().Account.create({
      customerId,
      username,
      passwordHash,
      role: role || 'user',
      lastLogin: null
    });

    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error });
  }
};

// Update account
export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { username, passwordHash, role, lastLogin } = req.body;
    const account = await getDb().Account.findByPk(req.params.id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (username && username !== account.username) {
      const existing = await getDb().Account.findOne({ where: { username } });
      if (existing) {
        return res.status(409).json({ message: 'Username already exists' });
      }
    }

    await account.update({
      username: username ?? account.username,
      passwordHash: passwordHash ?? account.passwordHash,
      role: role ?? account.role,
      lastLogin: lastLogin ?? account.lastLogin
    });

    res.json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error updating account', error });
  }
};

// Delete account
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const account = await getDb().Account.findByPk(req.params.id);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await account.destroy();
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error });
  }
};

