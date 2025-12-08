module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    document: DataTypes.STRING
  }, { tableName: 'clients' });

  return Client;
};
