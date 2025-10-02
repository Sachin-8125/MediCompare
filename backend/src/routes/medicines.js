import express from 'express'
import searchMedicines from '../controllers/medicineController.js';


const router = express.Router();

// Route to search for medicines
router.get('/search', searchMedicines);

export default router;