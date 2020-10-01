const router = require('express').Router();
const auth = require('../middlewares/auth');
const axios = require('../utils/axios');
const retry = require('../utils/retry');

router.get('/', auth, async (req, res) => {
  let heroes;
  try {
    const result = await axios.get('/heroes');
    heroes = result.data;
  } catch (error) {
    console.log('Error while getting heroes list');
    return res.status(503).send();
  }
  if (!req.isAuthenticated) {
    return res.send({ heroes });
  }

  // populate heroes' profiles
  try {
    const result = await Promise.all(
      heroes.map(({ id }) => axios.get(`/heroes/${id}/profile`))
    );
    heroes = heroes.map((h, i) => ({ ...h, profile: result[i].data }));
  } catch (error) {
    console.log('Error while getting heroes profiles');
  }
  return res.send({ heroes });
});

router.get('/:heroId', auth, async (req, res) => {
  let hero;
  try {
    const result = await retry(
      () => axios.get(`/heroes/${req.params.heroId}`),
      7
    );
    // if not able to get hero after 7 retries, tell client resource is unavailable
    if (!result) {
      return res.status(503).send();
    }
    hero = result.data;
  } catch (error) {
    console.log(`Error while getting hero id ${req.params.heroId}`);
    return res.status(404).send();
  }
  if (!req.isAuthenticated) {
    return res.send(hero);
  }

  // populate hero's profile
  try {
    const result = await axios.get(`/heroes/${req.params.heroId}/profile`);
    hero.profile = result.data;
  } catch (error) {
    console.log(`Error while getting hero ${req.params.heroId} profile`);
  }
  return res.send(hero);
});

module.exports = router;
