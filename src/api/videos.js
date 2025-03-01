const express = require('express');
const router = express.Router();

// Import create & fetch functions and apply them to the router
require('../api/videos/create')(router);
require('../api/videos/fetch')(router);

module.exports = router;
