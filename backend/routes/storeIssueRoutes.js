const express = require('express');
const router = express.Router();
const Item = require('../models/StoreIssue'); // Import Item model
const { handleStoreIssue } = require('../controllers/storeIssueController');
// const  { storeIssueController } = require('../controllers/storeIssueController');
// Handle store item requests
router.post("/", handleStoreIssue);

module.exports = router;
