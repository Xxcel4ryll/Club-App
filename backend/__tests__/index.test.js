const request = require('supertest');
const app = require('../app');

describe('Base Route', () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get('/');
  });

  it('returns 200 status code', () => {
    expect(response.statusCode).toBe(200);
  });

  it('shows status API Online', () => { 
    console.log(response);
    expect(response.body).toEqual({
      status: 'API Online',
      message: '******GOFONLINK CONNECTED******',
    });
  });
});
