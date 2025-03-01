const { DataTypes, UUIDV4 } = require('sequelize'); // Fix import
const sequelize = require('../api/db/sequelize');

const Video = sequelize.define(
  "Video",
  {
    id: {
      type: DataTypes.UUID,  
      defaultValue: UUIDV4, 
      primaryKey: true,
    },
    userId: {  
      type: DataTypes.STRING,  
      allowNull: false,  
    },
    title: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    s3Key: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    s3Url: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = Video;
