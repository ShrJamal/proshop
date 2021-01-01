import bcrypt from 'bcryptjs';

export default [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345678', 10),
    isAdmin: true,
  },
  {
    name: 'User 1',
    email: 'user1@example.com',
    password: bcrypt.hashSync('qwertyuiop', 10),
  },
  {
    name: 'User 2',
    email: 'user2@example.com',
    password: bcrypt.hashSync('asdfghjkl', 10),
  },
];
