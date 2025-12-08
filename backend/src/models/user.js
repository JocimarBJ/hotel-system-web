module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    passwordHash: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'user' }
  }, { tableName: 'users' });

  return User;
};
