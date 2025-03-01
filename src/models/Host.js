const { DataTypes } = require("sequelize");
const sequelize = require('../api/db/sequelize');

const Host = sequelize.define("Host", {
  id: { type: DataTypes.STRING,  primaryKey: true, allowNull: false, },
  fullname: DataTypes.STRING,
  email: DataTypes.STRING,
},
{
  tableName: 'hosts',
  freezeTableName: true,
  timestamps: false
});

module.exports = Host;
