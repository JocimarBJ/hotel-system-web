const bcrypt = require('bcrypt');
const { User, Room, Client } = require('../models');

module.exports = async function seedInitial() {
  // cria admin se nao existir
  const admin = await User.findOne({ where: { email: 'admin@utfpr.edu.br' } });
  if(!admin) {
    const hash = await bcrypt.hash('senha123', 10);
    await User.create({ name: 'Admin', email: 'admin@utfpr.edu.br', passwordHash: hash, role: 'admin' });
    console.log('Admin seeded: admin@utfpr.edu.br / senha123');
  }
  // cria alguns quartos de exemplo
  const rooms = await Room.findAll();
  if(rooms.length === 0) {
    await Room.bulkCreate([
      { number: '101', type: 'Single', daily: 120.00, available: true },
      { number: '102', type: 'Double', daily: 180.00, available: true },
      { number: '201', type: 'Suite', daily: 350.00, available: true }
    ]);
    console.log('Rooms seeded');
  }
  // cria um client exemplo
  const clients = await Client.findAll();
  if(clients.length === 0) {
    await Client.create({ name: 'Cliente Exemplo', email: 'cliente@exemplo.com', phone: '44999990000', document: '000.000.000-00' });
    console.log('Client seeded');
  }
};
