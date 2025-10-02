import express from 'express'
const { searchMedicines } = require('../controllers/medicineController');

const router = express.Router();

// Route to search for medicines
router.get('/search', searchMedicines);

module.exports = router;