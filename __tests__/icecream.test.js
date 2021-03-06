const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const IceCream = require('../lib/models/IceCream');

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

  it('gets a list of icecream', async () => {
    const expected = [
      { id: '1', flavor: 'salted caramel', brand: 'frankie and jo' },
    ];
    const res = await request(app).get('/api/v1/icecream');
    expect(res.body).toEqual(expected);
  });

  it('gets an icecream by id', async () => {
    const expected = await IceCream.findById(1);
    const res = await request(app).get(`/api/v1/icecream/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('returns 404 error if no icecream by id', async () => {
    const res = await request(app).get('/api/v1/icecream/444');
    expect(res.status).toEqual(404);
  });

  it('updates icecream by id', async () => {
    const expected = {
      id: expect.any(String),
      flavor: 'salted caramel',
      brand: 'frankie & jo',
    };
    const res = await request(app)
      .patch('/api/v1/icecream/1')
      .send({ brand: 'frankie & jo' });
    expect(res.body).toEqual(expected);
  });

  it('deletes an icecream by id', async () => {
    const expected = await IceCream.findById(1);
    const res = await request(app).delete(`/api/v1/icecream/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
