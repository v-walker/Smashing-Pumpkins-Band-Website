const express = require('express');
const router = express.Router();
const dataFile = require("../data/data.json") // converts to js object
// data structure: {albums: [{}, {}, {}]}

let albums = dataFile.albums // array of objects

router.get('/albums', (req, res) => {
    // display all albums
    let albumPhotos = []

    albums.forEach(albumObj => {
        albumPhotos = albumPhotos.concat(albumObj.artwork)
    })

    res.render('albums', {
        pageTitle: "Albums",
        albums: albums,
        artwork: albumPhotos
    })
});

router.get('/albums/:albumid', (req, res) => {
    // only 1 album

    res.render('albums/:albumid', {
        pageTitle: "Some Title"
    })
});

module.exports = router;