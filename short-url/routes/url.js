const express = require('express');
const { handleGenerateNewShortURL , handleGetShortURL, handleGetAnalytics} = require('../controllers/url');

const router = express.Router();

router.post('/' , handleGenerateNewShortURL);
router.get("/:shortID" , handleGetShortURL);
router.get("/analytics/:shortID" , handleGetAnalytics);

module.exports=router;