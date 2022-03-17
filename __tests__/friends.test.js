const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Friend = require('../lib/models/Friend');

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

  it('gets a list of friends', async () => {
    const expected = await Friend.findAll();
    const res = await request(app).get('/api/v1/friends');
    expect(res.body).toEqual(expected);
  });
  // get all
  // get by id
  // update
  // delete
});
