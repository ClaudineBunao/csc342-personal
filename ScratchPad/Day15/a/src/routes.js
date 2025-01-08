const express = require('express');
const router = express.Router();

//Import the APIRoutes object from the APIRoutes.js file in the src/api folder.
const apiRoutes = require('./api/APIRoutes');

//Mount the APIRoutes router onto the /api path of the router object in the file
router.use('/api', apiRoutes);

//provide routes for frontend, static resources and html
const frontendRouter = require('./frontend/FrontendRoutes');

//fronted router attatched to the app router
//attach frontend routes to frontend router
router.use(frontendRouter);

module.exports = router;