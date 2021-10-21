const express = require('express');
const router = express.Router();

// import data from data.json
const dataFile = require("../data/data.json") // converts to js object
// data structure: {albums: [{}, {}, {}]}

router.get('/', (req, res) => {
    let albums = dataFile.albums // array of objects

    res.render('index', {
        pageTitle: "The Smashing Pumpkins"
    })
});

module.exports = router;