import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getDb = () => require('../../models');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const TOKEN_EXPIRY = '2h';

// Keep the password check beginner-friendly:
// - If the stored value looks like bcrypt, use bcrypt.compare
// - Otherwise fall back to plain string match (useful for seed data)
const isBcrypt = (hash: string) => hash?.startsWith('$2');

const checkPassword = async (password: string, stored: string) => {
  if (!stored) return false;
  if (isBcrypt(stored)) {
    return bcrypt.compare(password, stored);
  }
  return password === stored;
};

const stripSensitive = (account: any) => {
  const plain = account.toJSON ? account.toJSON() : account;
  const { passwordHash, ...safe } = plain;
  return safe;
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    // Find account by customer email
    const account = await getDb().Account.findOne({
      include: [{
        model: getDb().Customer,
        as: 'customer',
        where: { email },
        required: true
      }]
    });

    if (!account) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await checkPassword(password, account.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    await account.update({ lastLogin: new Date() });

    const token = jwt.sign(
      { sub: account.accountId, role: account.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    res.json({
      token,
      account: stripSensitive(account)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const auth = (req as any).auth;
    if (!auth?.sub) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const account = await getDb().Account.findByPk(auth.sub, {
      include: [{ model: getDb().Customer, as: 'customer' }]
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ account: stripSensitive(account) });
  } catch (error) {
    res.status(500).json({ message: 'Error loading session', error });
  }
};

