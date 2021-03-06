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
    });

    res.render('albums', {
        pageTitle: "Albums | The Smashing Pumpkins",
        albums: albums,
        artwork: albumPhotos
    });
});

router.get('/albums/:albumid', (req, res) => {
    // only 1 album

    let album = req.params.albumid;
    let albumArray = [];
    let images = [];
    let tracks = [];
    
    albums.forEach(albumObj => {
        if (albumObj.shortname === album) {
            // need to finish this part
            albumArray.push(albumObj);
            images = [...albumObj.artwork];
            tracks = [...albumObj.tracklist];
        }
    });
    
    res.render('albums', {
        pageTitle: `Albums | The Smashing Pumpkins`,
        albums: albumArray,
        images: images,
        tracks: tracks
    });
});

module.exports = router;