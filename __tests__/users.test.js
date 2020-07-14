process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

//beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/users', () => {
  test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
    const invalidMethods = ['patch', 'put', 'delete'];
    const requests = invalidMethods.map((method) => {
      return request(app)
        [method]('/api/users')
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('method not allowed');
        });
    });

    return Promise.all(requests);
  });

  describe('GET', () => {
    test('status:200 - responds with array of user objects with required keys', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users } }) => {
          expect(Array.isArray(users)).toBe(true);
          expect(users.length).toBe(4);
          users.forEach((user) => {
            expect(user).toHaveProperty('username');
            expect(user).toHaveProperty('name');
          });
        });
    });
  });

  describe('POST', () => {
    test.only('status:201 responds with created user object', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'unique-username',
          name: 'full-name',
        })
        .expect(201)
        .then(({ body }) => {
          console.log(body);
        });
      // .then(({ body: { user } }) => {
      //   expect(user).toEqual({
      //     user_id: 5,
      //     username: 'unique-username',
      //     name: 'full name',
      //   });
      // });
    });

    test('status:400 - invalid body, missing username key - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          name: 'full name',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:400 - invalid body, missing name key - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'unique-username',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:400 - invalid body, existing username - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'user-1',
          name: 'Robert',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });

  describe('/:username', () => {
    test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
      const invalidMethods = ['post', 'patch', 'put', 'delete'];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/users/robert_plant')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });

      return Promise.all(requests);
    });

    describe('GET', () => {
      test('status:200 - responds with requested user object', () => {
        return request(app)
          .get('/api/users/user-1')
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toEqual({
              user_id: 1,
              username: 'user-1',
              name: 'name-1',
            });
          });
      });

      test('status:404 - non-existent username - responds with msg: "user not found"', () => {
        return request(app)
          .get('/api/users/nonExistentUser')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('user not found');
          });
      });
    });
  });
});
