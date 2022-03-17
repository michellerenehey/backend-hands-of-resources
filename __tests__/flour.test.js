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
});
