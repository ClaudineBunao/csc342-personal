const express = require('express');
const router = express.Router();

const CountyDAO = require('./db/CountyDAO');
const ParkDAO = require('./db/ParkDAO');
const { getParkById } = require('./db/ParkDAO');

//Get all counties.
router.get('/counties', (req, res) => {
    CountyDAO.getCounties().then(counties => {
        res.json(counties);
    });
});

//Get a county by ID. If the county is not found, return a 404 status code and an appropriate message as JSON.
router.get('/counties/:countyId', (req, res) => {

    // If the county is not found, return a 404 status code and an appropriate message as JSON
    CountyDAO.getCountyById(req.params.countyId).then(county => {       //extract the varible data from the url
        res.json(county);
    }).catch(() => {
        res.status(404).json({ error: 'County not found' });
    });
    
});

//Get all parks in a given county. If there is an error (e.g., the county is not found), return a 404 status code and an appropriate message as JSON.
router.get('/counties/:countyId/parks', (req, res) => {
    const countyId = parseInt(req.params.countyId);
    ParkDAO.getParksByCountyId(countyId).then(parks => {
        res.json(parks);
    }).catch(() => {
        res.status(404).json({ error: 'County not found' });
    });
});

//Get all parks.
router.get('/parks', (req, res) => {
    ParkDAO.getParksByCountyId(NaN).then(parks => {
        res.json(parks);
    });
});

//Get a park by ID. If the park is not found, return a 404 status code and an appropriate message as JSON.
router.get('/parks/:parkId', (req, res) => {
    ParkDAO.getParkById(req.params.parkId).then(park => {
        res.json(park);
    }).catch(() => {
        res.status(404).json({ error: 'Park not found' });
    });
    
});

//Make sure to export the router object at the end of the file as the default export.
module.exports = router;