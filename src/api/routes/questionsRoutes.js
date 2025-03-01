const express = require('express');
const router = express.Router();

require('../questions/createQuestions')(router);

module.exports = router;
