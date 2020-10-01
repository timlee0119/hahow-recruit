const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://hahow-recruit.herokuapp.com',
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
});

module.exports = instance;
