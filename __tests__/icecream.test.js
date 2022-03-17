const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-hands-of-resources routes, icecream table', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates an icecream', async () => {
    const expected = {
      flavor: 'phish food',
      brand: 'ben & jerrys',
    };
    const res = await request(app).post('/api/v1/icecream').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});