const { DataTypes } = require("sequelize");
const sequelize = require('../api/db/sequelize');
const Interview = require("./Interview");

const Analysis = sequelize.define("Analysis", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  question_num: DataTypes.INTEGER,
  correctness_score: DataTypes.FLOAT,
  fluency_score: DataTypes.FLOAT,
  alert_count: DataTypes.INTEGER,
  interview_id: {  // Foreign Key
    type: DataTypes.UUID,
    references: { model: 'interviews', key: "id" },
    onDelete: "CASCADE",
  },
},
{
  tableName: 'analysis',
  freezeTableName: true,
  timestamps: true
});

// Associations
Interview.hasMany(Analysis, { foreignKey: "interview_id" });
Analysis.belongsTo(Interview, { foreignKey: "interview_id" });

module.exports = Analysis;
