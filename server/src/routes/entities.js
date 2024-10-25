const express = require('express');
const router = express.Router();

// Mock data for entity types
const entityTypes = [
  { id: 1, name: 'Company' },
  { id: 2, name: 'Organization' },
  { id: 3, name: 'Institution' }
];

router.get('/types', (req, res) => {
  res.json(entityTypes);
});

module.exports = router;