const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-hands-of-resources routes, chores table', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a chore', async () => {
    const expected = {
      name: 'sweep',
      location: 'kitchen',
      frequency: 'daily'
    };
    const res = await request(app).post('/api/v1/chores').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});