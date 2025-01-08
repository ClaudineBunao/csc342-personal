const express = require('express');
const router = express.Router();

const frontendRouter = require('./frontend/FrontendRoutes');
const WebSocketRoutes = require('./WebSocketRoutes');

router.use(frontendRouter);
// Import and attach the router to the existing router
router.use(WebSocketRoutes);

module.exports = router;