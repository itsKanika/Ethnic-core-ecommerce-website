const express = require('express');
const router = express.Router();
// Aapke folder ka naam 'controller' hai (singular), isliye path ye hoga:
const { getAdminStats } = require('../controller/analyticsController');

router.get('/stats', getAdminStats);

module.exports = router;