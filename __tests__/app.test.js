const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Housewife = require('../lib/models/Housewife');

describe('backend-hands-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  // real housewives table
  it('creates a housewive', async () => {
    const expected = {
      name: 'Kim Richards',
      season: 'beverly hills',
    };
    const res = await request(app).post('/api/v1/housewives').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of housewives', async () => {
    const expected = await Housewife.findAll();
    const res = await request(app).get('/api/v1/housewives');
    expect(res.body).toEqual(expected);
  });

  it('gets a housewife by id', async () => {
    const expected = await Housewife.findById(1);
    const res = await request(app).get('/api/v1/housewives/1');
    expect(res.body).toEqual(expected);
  });
});
