const { DataTypes } = require("sequelize");
const sequelize = require('../api/db/sequelize');
const Interview = require("./Interview");

const Timestamp = sequelize.define("Timestamp", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  question_num: DataTypes.INTEGER,
  start_time: DataTypes.INTEGER,
  end_time: DataTypes.INTEGER,
  interview_id: {  // Foreign Key
    type: DataTypes.INTEGER,
    references: { model: "interviews", key: "id" },
    onDelete: "CASCADE",
  },
},
{
  tableName: 'timestamps',
  freezeTableName: true,
  timestamps: true
});

// Associations
Interview.hasMany(Timestamp, { foreignKey: "interview_id" });
Timestamp.belongsTo(Interview, { foreignKey: "interview_id" });

module.exports = Timestamp;
