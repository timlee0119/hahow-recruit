const axios = require('../utils/axios');

// A middleware that checks whether the request contains valid Name and Password in header
// If valid, set req.isAuthenticated to true and let subsequent routers populates profiles
module.exports = async (req, res, next) => {
  const { name, password } = req.headers;
  if (!name || !password) {
    return next();
  }

  try {
    const { status } = await axios.post('/auth', { name, password });
    if (status === 200) {
      req.isAuthenticated = true;
    }
  } catch (error) {
    console.log('Error when log in');
  }

  next();
};
