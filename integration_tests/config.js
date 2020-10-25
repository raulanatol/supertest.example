const request = require('supertest');

const getAPI = (endpoint = '') => request(`http://localhost:3000${endpoint}`);

module.exports = {
  getAPI
};


