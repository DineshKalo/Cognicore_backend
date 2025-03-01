const { DataTypes } = require("sequelize");
const sequelize = require('../api/db/sequelize');
const Host = require("./Host");

const Interview = sequelize.define("Interview", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  interviewee_name: DataTypes.STRING,
  interviewee_email: DataTypes.STRING,
  job_role: DataTypes.STRING,
  tech_stack: DataTypes.STRING,
  s3_video_url: DataTypes.STRING,
  s3_questions_url: DataTypes.STRING,
  host_id: {  // Foreign Key
    type: DataTypes.STRING,
    references: { model: "hosts", key: "id" },
    onDelete: "CASCADE",
  },
},
{
  tableName: 'interviews',
  freezeTableName: true,
  timestamps: true
});

// Associations
Host.hasMany(Interview, { foreignKey: "host_id" });
Interview.belongsTo(Host, { foreignKey: "host_id" });

module.exports = Interview;
