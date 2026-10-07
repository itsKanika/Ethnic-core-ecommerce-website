const express = require('express');
const router = express.Router();
const Category = require('../model/Category');

router.get('/', async (req, res) => {
    try {
        const cats = await Category.find();
        res.json(cats);
    } catch (err) { res.status(500).json({ error: "Server Error" }); }
});

router.post('/', async (req, res) => {
    const { name, subCategories } = req.body;
    try {
        const cat = await Category.findOneAndUpdate(
            { name }, 
            { subCategories }, 
            { upsert: true, new: true }
        );
        res.json(cat);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;