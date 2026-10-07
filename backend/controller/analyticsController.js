const Product = require('../model/Product');
const User = require('../model/User');
const Order = require('../model/Order');

exports.getAdminStats = async (req, res) => {
    try {
        const [prods, users, orders] = await Promise.all([
            Product.countDocuments(),
            User.countDocuments(),
            Order.countDocuments()
        ]);
        res.status(200).json({ prods, users, orders });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};