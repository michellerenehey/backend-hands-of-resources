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

  it('gets a friend by id', async () => {
    const expected = await Friend.findById(2);
    const res = await request(app).get(`/api/v1/friends/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('returns 404 error if no friend id', async () => {
    const res = await request(app).get(
      '/api/v1/friends/fake-id-does-not-exist'
    );
    expect(res.status).toEqual(404);
  });

  it('updates a friend by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'ian',
      city: 'reno',
      favoriteAnimal: 'hedgehog',
    };
    const res = await request(app)
      .patch('/api/v1/friends/2')
      .send({ favoriteAnimal: 'hedgehog' });
    expect(res.body).toEqual(expected);
  });
  // update
  // delete
});
