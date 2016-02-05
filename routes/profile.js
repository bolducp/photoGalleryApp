'use strict';

var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../models/user');
var Album = require('../models/album');
var Photo = require('../models/photo');

router.use(authMiddleware);

/* GET user's profile page and display */
router.get('/', function(req, res, next){
  User.findById(req.user._id, function(err, user) {
    if (err) return res.status(400).send(err);
    res.render('profile', {user: user});
  });
});

/* GET to render change password page */
router.get('/changePassword', function(req, res){
  res.render('changePassword');
});

/* GET to render user albums */
router.get('/albums', function(req, res){
  Album.renderAlbums(req.user._id, function(err, albums){
    if (err) return res.status(400).send(err);
    res.render('albums', {albums: albums});
  });
});

/* POST to create new album */
router.post('/albums', function(req, res){
  Album.create({title: req.body.title, userId: req.user._id}, function(err, album){
    if (err) return res.status(400).send(err);
    res.send("album created");
  });
});

/* GET to render create album page */
router.get('/createAlbum', function(req, res){
  res.render('createAlbum');
});

/* GET to render album details page */
router.get('/albums/:albumId', function(req, res) {
  Album.displayAlbum(req.params.albumId, function(err, data){
    if (err) return res.status(400).send(err);
    res.render('albumDetails', data);
  });
});

module.exports = router;
