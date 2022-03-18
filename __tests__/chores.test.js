const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Chore = require('../lib/models/Chore');

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
      frequency: 'daily',
    };
    const res = await request(app).post('/api/v1/chores').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('finds a list of chores', async () => {
    const expected = [
      { id: '1', name: 'make bed', location: 'bedroom', frequency: 'daily' },
    ];
    const res = await request(app).get('/api/v1/chores');
    expect(res.body).toEqual(expected);
  });

  it('finds a chore by id', async () => {
    const expected = await Chore.findById(1);
    const res = await request(app).get(`/api/v1/chores/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
