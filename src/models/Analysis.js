const { DataTypes } = require("sequelize");
const sequelize = require('../api/db/sequelize');
const Interview = require("./Interview");

const Analysis = sequelize.define("Analysis", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  alert_count: DataTypes.INTEGER,
  details: DataTypes.JSONB,

  interview_id: {  // Foreign Key
    type: DataTypes.INTEGER,
    references: { model: 'interviews', key: "id" },
    onDelete: "CASCADE",
  },
  score:DataTypes.FLOAT,
  status: DataTypes.STRING,
},
{
  tableName: 'analysis',
  freezeTableName: true,
  timestamps: false
});

// Associations
Interview.hasMany(Analysis, { foreignKey: "interview_id" });
Analysis.belongsTo(Interview, { foreignKey: "interview_id" });

module.exports = Analysis;
