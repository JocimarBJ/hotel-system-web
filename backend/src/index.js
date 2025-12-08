require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const seedInitial = require('./utils/seed');

const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const roomRoutes = require('./routes/rooms');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/clients', clientRoutes);
app.use('/rooms', roomRoutes);
app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
(async () => {
  await sequelize.sync(); // sincroniza modelos (cria o arquivo sqlite automaticamente)
  await seedInitial();
  app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
