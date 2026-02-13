import bcrypt from 'bcryptjs';

// Simple in-memory admin store (Replace with MongoDB in production)
let admins = [
  {
    id: '1',
    email: 'admin@stagejhook.com',
    password: '', // Will be hashed on initialization
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date()
  }
];

// Initialize admin password
const defaultPassword = 'admin123'; // Change this in production
admins[0].password = await bcrypt.hash(defaultPassword, 10);

export const findAdminByEmail = (email) => {
  return admins.find(admin => admin.email === email);
};

export const createAdmin = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = {
    id: String(admins.length + 1),
    email,
    password: hashedPassword,
    name,
    role: 'admin',
    createdAt: new Date()
  };
  admins.push(admin);
  return admin;
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const getAllAdmins = () => {
  return admins.map(({ password, ...admin }) => admin); // Don't return passwords
};
