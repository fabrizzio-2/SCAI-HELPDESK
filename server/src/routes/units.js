const express = require('express');
const router = express.Router();

// Mock data for units
const units = [
  { id: 1, name: 'IT Support' },
  { id: 2, name: 'Customer Service' },
  { id: 3, name: 'Technical Support' },
  { id: 4, name: 'Sales Support' }
];

router.get('/', (req, res) => {
  res.json(units);
});

module.exports = router;