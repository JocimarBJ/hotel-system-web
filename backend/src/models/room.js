module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    number: DataTypes.STRING,
    type: DataTypes.STRING,
    daily: DataTypes.DECIMAL(10,2),
    available: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'rooms' });

  return Room;
};
