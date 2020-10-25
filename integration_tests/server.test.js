const { getAPI } = require("./config");

const api = getAPI();

describe('Home page', () => {
  it('says hello when the user accesses the first time', done => {
    api.get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(done);
  });
});

