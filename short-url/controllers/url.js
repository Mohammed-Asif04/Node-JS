const { nanoid } = require('nanoid');
const URL = require('../model/url');
const e = require('express');


async function handleGenerateNewShortURL(req ,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({
            error: 'url is required'
        });
    }
    const shortID = nanoid(8);
    await URL.create({
        shortID : shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.json({
        id: shortID
    });
}

async function handleGetShortURL(req ,res){
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortID: shortID
    }, {$push:{
        visitHistory: {
            timestamp: Date.now()
        }
    }})
    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req ,res){
    const shortID = req.params.shortID;
    const result = await URL.findOne({
        shortID: shortID
    });
    res.json({totalClicks: result.visitHistory.length , visitHistory: result.visitHistory});
}

module.exports={
    handleGenerateNewShortURL,
    handleGetShortURL,
    handleGetAnalytics,
}