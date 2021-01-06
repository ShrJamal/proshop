import bcrypt from 'bcryptjs';

export default [
  {
    username: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345678', 10),
    isAdmin: true,
  },
  {
    username: 'User 1',
    email: 'user1@example.com',
    password: bcrypt.hashSync('qwertyuiop', 10),
  },
  {
    username: 'User 2',
    email: 'user2@example.com',
    password: bcrypt.hashSync('asdfghjkl', 10),
  },
];
