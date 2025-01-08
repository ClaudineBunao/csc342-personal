const express = require('express');
const router = express.Router();


const APIRoutes = require("./APIRoutes"); // Import our API endpoints

const frontendRoutes = require("./frontendRoutes"); //Import the webpages

router.use(frontendRoutes);

router.use("/api", APIRoutes); // Add them to the router object

module.exports = router;