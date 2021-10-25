const express = require('express');
const router = express.Router();

router.get('/chat', (req, res) => {

    res.render('chat', {
        pageTitle: "The Smashing Pumpkins | Chat"
    })
});

module.exports = router;