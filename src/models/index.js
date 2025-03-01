const sequelize = require('../api/db/sequelize');

const User = require('./User');
const Video = require('./Video');
const Host = require('./Host');
const Interview = require('./Interview');
const Analysis = require('./Analysis');
const Timestamp = require('./Timestamp');
const VideoLink = require('./VideoLink');

// Define Associations
Host.hasMany(Interview, { foreignKey: 'host_id' });
Interview.belongsTo(Host, { foreignKey: 'host_id' });

Interview.hasMany(Analysis, { foreignKey: 'interview_id' });
Analysis.belongsTo(Interview, { foreignKey: 'interview_id' });

Interview.hasMany(Timestamp, { foreignKey: 'interview_id' });
Timestamp.belongsTo(Interview, { foreignKey: 'interview_id' });

Host.hasMany(VideoLink, { foreignKey: 'host_id' });
VideoLink.belongsTo(Host, { foreignKey: 'host_id' });

module.exports = { sequelize, User, Video, Host, Interview, Analysis, Timestamp, VideoLink };
