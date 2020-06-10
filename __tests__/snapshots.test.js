process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/api/plants/:plant_id/snapshots', () => {
  describe('GET', () => {
    test('status:200 - responds with array of snapshot objects', () => {
      return request(app)
        .get('/api/plants/1/snapshots')
        .expect(200)
        .then(({ body: { snaps } }) => {
          expect(Array.isArray(snaps)).toBe(true);
          expect(snaps.length).toBe(2);
          snaps.map((snap) => {
            expect(snap.plant_id).toBe(1);
          });
        });
    });
    test('status:200 - responds with array of snapshot objects', () => {
      return request(app)
        .get('/api/plants/4/snapshots')
        .expect(200)
        .then(({ body: { snaps } }) => {
          expect(Array.isArray(snaps)).toBe(true);
          expect(snaps.length).toBe(2);
          snaps.map((snap) => {
            expect(snap.plant_id).toBe(4);
          });
        });
    });
    test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
      const invalidMethods = ['patch', 'put', 'delete'];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/plants/4/snapshots')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });

      return Promise.all(requests);
    });

    test('status:404 - non-existent plant_id - responds with msg: "plant not found"', () => {
      return request(app)
        .get('/api/plants/100/snapshots')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('plant not found');
        });
    });

    test('status:400 - non-existent plant_id - responds with msg: "bad request"', () => {
      return request(app)
        .get('/api/plants/notanumber/snapshots')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
});
