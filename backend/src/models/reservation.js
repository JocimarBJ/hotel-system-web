module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    clientId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    checkIn: DataTypes.DATEONLY,
    checkOut: DataTypes.DATEONLY,
    total: DataTypes.DECIMAL(10,2)
  }, { tableName: 'reservations' });

  return Reservation;
};
