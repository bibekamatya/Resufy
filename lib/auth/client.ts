import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../mongodb';
import User from '../models/User';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export class AuthClient {
  async signUp(email: string, password: string, name: string) {
    await connectDB();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async signIn(email: string, password: string) {
    await connectDB();
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async getUser(token: string): Promise<AuthUser | null> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      await connectDB();
      
      const user = await User.findById(decoded.userId);
      if (!user) return null;

      return {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      };
    } catch {
      return null;
    }
  }
}

export const authClient = new AuthClient();