const pool = require('../db');

const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to fetch products'
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Product not found'
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            image_url,
            stock,
            category_id
        } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({
                error: 'Name and price are required'
            });
        }

        const result = await pool.query(
            `INSERT INTO products
            (name, description, price, image_url, stock, category_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [name, description, price, image_url, stock, category_id]
        );

        return res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        return res.json({
            message: 'Product deleted successfully'
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct
};