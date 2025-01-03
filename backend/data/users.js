import bcrypt from 'bcrypt';

const users = [
    { name: 'Admin User', email: 'admin@email.com', password: bcrypt.hashSync('123456', 10), isAdmin: true },
    { name: 'Fat User', email: 'fat@email.com', password: bcrypt.hashSync('123456', 10), isAdmin: false },
    { name: 'Thin User', email: 'thin@email.com', password: bcrypt.hashSync('123456', 10), isAdmin: false },
    { name: 'Tall User', email: 'tall@email.com', password: bcrypt.hashSync('123456', 10), isAdmin: false },
    { name: 'Short User', email: 'short@email.com', password: bcrypt.hashSync('123456', 10), isAdmin: false },
]

export default users