const express = require('express');
const router = express.Router();

router.get('/chat', (req, res) => {

    res.render('chat', {
        pageTitle: "Chat | The Smashing Pumpkins",
        pageID: "chat"
    });
});

module.exports = router;