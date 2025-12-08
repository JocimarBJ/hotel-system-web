const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const storage = process.env.DATABASE_STORAGE || path.join(__dirname, '..', 'db', 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false
});

const User = require('./user')(sequelize, DataTypes);
const Client = require('./client')(sequelize, DataTypes);
const Room = require('./room')(sequelize, DataTypes);
const Reservation = require('./reservation')(sequelize, DataTypes);

// associations
Client.hasMany(Reservation, { foreignKey: 'clientId' });
Room.hasMany(Reservation, { foreignKey: 'roomId' });
Reservation.belongsTo(Client, { foreignKey: 'clientId' });
Reservation.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Client,
  Room,
  Reservation
};
