const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-hands-of-resources routes, friends table', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a friend', async () => {
    const expected = {
      name: 'emma',
      city: 'tulsa',
      favoriteAnimal: 'cat',
    };
    const res = await request(app).post('/api/v1/friends').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
  // post
  // get all
  // get by id
  // update
  // delete
});
