const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory "database"
const seedProducts = () => [
  { id: 1, name: 'Kikoy Scarf', price: 1200 },
  { id: 2, name: 'Maasai Beaded Bracelet', price: 800 },
];
let products = seedProducts();
let nextId = 3;

// Test helper: restores the initial state so tests don't depend on each other.
app.locals.reset = () => {
  products = seedProducts();
  nextId = 3;
};

// GET /api/products - list all
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// POST /api/products - create (requires name and price)
app.post('/api/products', (req, res) => {
  const { name, price } = req.body || {};

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ error: 'Price is required and must be a non-negative number' });
  }

  const product = { id: nextId++, name: name.trim(), price };
  products.push(product);
  res.status(201).json(product);
});

// GET /api/products/:id - single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.status(200).json(product);
});

// DELETE /api/products/:id - remove a product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products.splice(index, 1);
  res.status(204).send();
});

// Malformed JSON bodies -> 400 instead of Express's default HTML error page
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err);
});

module.exports = app;
