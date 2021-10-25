const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// import fs module (read and write to file)
const fs = require('fs');

// import contents of forum json file
let forumData = require('../data/forum.json'); // is converted to json object
// data structure: [{name: , title: , message: ,}, {}, {}]

router.get('/message_board', (req, res) => {
    res.render('message_board')
});

router.get('/api', (req, res) => {
    res.json(forumData);
});

router.post('/api', (req, res) => {
    // grab data from body parser
    let {name, title, message} = req.body
    console.log(req.body);
    // push it to the forumData Obj
    forumData.unshift(req.body);
    
    // save to forum.json file
    fs.writeFile('data/forum.json', JSON.stringify(forumData), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`forum.json file has been updated`);
    });

    res.json(forumData);
});

router.delete('/api', (req, res) => {
    let messageID = parseInt(req.body.id);
    console.log(messageID);
    forumData.splice(messageID, 1);

    fs.writeFile('data/forum.json', JSON.stringify(forumData), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`forum.json file has been updated`);
    });
    res.json(forumData);
});

module.exports = router;