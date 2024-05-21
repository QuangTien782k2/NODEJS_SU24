const express = require('express');
const router = express.Router();

// Define routes for leaders
router.route('/')
  .get((req, res) => {
    res.send('Will send all the leaders to you!');
  })
  .post((req, res) => {
    res.send('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .put((req, res) => {
    res.status(403).send('PUT operation not supported on /leaders');
  })
  .delete((req, res) => {
    res.send('Deleting all leaders');
  });

router.route('/:leaderId')
  .get((req, res) => {
    res.send('Will send details of the leader: ' + req.params.leaderId + ' to you!');
  })
  .post((req, res) => {
    res.status(403).send('POST operation not supported on /leaders/' + req.params.leaderId);
  })
  .put((req, res) => {
    res.send('Updating the leader: ' + req.params.leaderId + '\nWill update the leader: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .delete((req, res) => {
    res.send('Deleting leader: ' + req.params.leaderId);
  });

module.exports = router;
