// routes/conversationRoutes.js
const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const searchController = require('../controllers/searchController');

router.get('/recent', conversationController.getRecentConversations);
router.get('/search', searchController.searchConversations);

module.exports = router;