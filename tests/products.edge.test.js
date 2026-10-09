// Extra edge-case tests (bonus: raise coverage by hitting error branches)
const request = require('supertest');
const app = require('../app');

beforeEach(() => {
  app.locals.reset();
});

describe('GET /api/products/:id edge cases', () => {
  it('returns 404 for an unknown id', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Product not found');
  });

  it('returns 404 for a non-numeric id', async () => {
    const res = await request(app).get('/api/products/abc');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/products validation', () => {
  it('returns 400 when price is missing', async () => {
    const res = await request(app).post('/api/products').send({ name: 'No Price' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('returns 400 when price is not a number', async () => {
    const res = await request(app).post('/api/products').send({ name: 'Bad', price: 'free' });
    expect(res.status).toBe(400);
  });

  it('returns 400 when price is negative', async () => {
    const res = await request(app).post('/api/products').send({ name: 'Bad', price: -5 });
    expect(res.status).toBe(400);
  });

  it('returns 400 when name is blank', async () => {
    const res = await request(app).post('/api/products').send({ name: '   ', price: 10 });
    expect(res.status).toBe(400);
  });

  it('returns 400 when there is no body at all', async () => {
    const res = await request(app).post('/api/products');
    expect(res.status).toBe(400);
  });

  it('returns 400 for malformed JSON', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Content-Type', 'application/json')
      .send('{"name": "oops",');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid JSON');
  });
});

describe('product lifecycle', () => {
  it('trims names and assigns incrementing ids', async () => {
    const a = await request(app).post('/api/products').send({ name: '  Tea  ', price: 0 });
    const b = await request(app).post('/api/products').send({ name: 'Coffee', price: 500 });
    expect(a.body.name).toBe('Tea');
    expect(b.body.id).toBe(a.body.id + 1);
  });

  it('a deleted product is no longer retrievable', async () => {
    await request(app).delete('/api/products/1');
    const res = await request(app).get('/api/products/1');
    expect(res.status).toBe(404);
    const list = await request(app).get('/api/products');
    expect(list.body).toHaveLength(1);
  });

  it('returns 404 when deleting a product that does not exist', async () => {
    const res = await request(app).delete('/api/products/999');
    expect(res.status).toBe(404);
  });
});
