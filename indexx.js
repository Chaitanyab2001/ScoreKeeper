const express = require('express');
const router  = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'Home' });
});

router.post('/authenticateLogin', function(req, res){
    console.log("Authenticating 1!");
    res.send('number one!');
});

module.exports = router;
