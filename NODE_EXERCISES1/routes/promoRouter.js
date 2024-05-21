const express = require('express');
const router = express.Router();

// Define routes for promotions
router.route('/')
  .get((req, res) => {
    res.send('Will send all the promotions to you!');
  })
  .post((req, res) => {
    res.send('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put((req, res) => {
    res.status(403).send('PUT operation not supported on /promotions');
  })
  .delete((req, res) => {
    res.send('Deleting all promotions');
  });

router.route('/:promoId')
  .get((req, res) => {
    res.send('Will send details of the promotion: ' + req.params.promoId + ' to you!');
  })
  .post((req, res) => {
    res.status(403).send('POST operation not supported on /promotions/' + req.params.promoId);
  })
  .put((req, res) => {
    res.send('Updating the promotion: ' + req.params.promoId + '\nWill update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .delete((req, res) => {
    res.send('Deleting promotion: ' + req.params.promoId);
  });

module.exports = router;
