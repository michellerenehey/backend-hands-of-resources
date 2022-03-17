const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Flour = require('../lib/models/Flour');

describe('backend-hands-of-resources routes, flour table', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a flour', async () => {
    const expected = {
      type: 'cake',
      protein: '7%',
    };
    const res = await request(app).post('/api/v1/flours').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('finds a list of flours', async () => {
    const expected = await Flour.findAll();
    const res = await request(app).get('/api/v1/flours');
    expect(res.body).toEqual(expected);
  });

  it('finds a flour by id', async () => {
    const expected = await Flour.findById(1);
    const res = await request(app).get(`/api/v1/flours/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('returns 404 for flour not found', async () => {
    const res = await request(app).get('/api/v1/flowers/333');
    expect(res.status).toEqual(404);
  });

  it('updates flour by id', async () => {
    const expected = {
      id: expect.any(String),
      type: 'bread',
      protein: '13%',
    };
    const res = await request(app)
      .patch('/api/v1/flours/1')
      .send({ protein: '13%' });
    expect(res.body).toEqual(expected);
  });
});
