const request = require('supertest');
const app = require('../app');

// Fresh data before every test so order never matters
beforeEach(() => {
  app.locals.reset();
});

describe('GET /api/products', () => {
  it('returns a list of products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /api/products', () => {
  it('creates a new product with 201 status', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'Sisal Basket', price: 1500 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Sisal Basket');
    expect(response.body.price).toBe(1500);
  });
});

describe('GET /api/products/:id', () => {
  it('returns a single product by ID', async () => {
    const response = await request(app).get('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Kikoy Scarf', price: 1200 });
  });
});

describe('POST /api/products (invalid)', () => {
  it('returns 400 when name is missing', async () => {
    const response = await request(app).post('/api/products').send({ price: 100 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /api/products/:id', () => {
  it('deletes a product and returns 204', async () => {
    const response = await request(app).delete('/api/products/1');
    expect(response.status).toBe(204);
  });
});
