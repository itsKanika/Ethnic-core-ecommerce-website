const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Tumhara 'model' singular hai

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// DELETE user route
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;