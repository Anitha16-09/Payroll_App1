const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const taxController = require('../controllers/taxController');

// Using 'proof' as the key for the file upload
router.post('/update', upload.single('proof'), taxController.submitDeclaration);

module.exports = router;