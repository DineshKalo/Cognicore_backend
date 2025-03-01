const { DataTypes } = require("sequelize");
const sequelize = require('../api/db/sequelize');
const Host = require("./Host");

const VideoLink = sequelize.define("VideoLink", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  job_role: DataTypes.STRING,
  tech_stack: DataTypes.STRING,
  link: DataTypes.STRING,
  created_at: DataTypes.DATE,
  expires_at: DataTypes.DATE,
  host_id: {  // Foreign Key
    type: DataTypes.STRING,
    references: { model: "hosts", key: "id" },
    onDelete: "CASCADE",
  },
},
{
  tableName: 'videolinks',
  freezeTableName: true,
  timestamps: true
});

// Associations
Host.hasMany(VideoLink, { foreignKey: "host_id" });
VideoLink.belongsTo(Host, { foreignKey: "host_id" });

module.exports = VideoLink;
