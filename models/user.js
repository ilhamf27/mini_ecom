'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Role, {
        foreignKey: 'idRole',
        as: "roles"
      })
      this.hasOne(models.Balance, {
        as : 'balance',
        foreignKey: 'userId'
      })
      this.hasMany(models.History, {
        as : 'histories',
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    idRole: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};