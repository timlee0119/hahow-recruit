# hahow-recruit [![Build Status](https://travis-ci.com/timlee0119/hahow-recruit.svg?branch=master)](https://travis-ci.com/timlee0119/hahow-recruit)
## How to Run
1. Clone this project
2. `yarn install`
3. `yarn start`
## How to Test
`yarn test`
## Project Structure
    .
    ├── middlewares/            # A middleware that checks whether a request has valid Name and Password headers
    ├── routes/                 # All Express Routers
    ├── tests/                  # Postman conifg files for Newman API testing
    ├── utils/                  # Utility files (creating axios instance, handling request retry logic)
    ├── app.js                  # Starts the API server
    └── ...
## Third Party Libraries
- Express: A NodeJS web application framework. Convenient for developers to define middlewares and routers.
- axios: An HTTP client supporting the Promise API.
- morgan: An HTTP request logger.
- newman: A command line collection runner for Postman.
- nodemon: Monitors changes and automatically restarts server.
## When Would I Comment on my Code?
- To give a function/file an explanation about parameters, desired input/output and purpose
- When a part code is not straighforwad enough for readers to understand the implementation logic
## Issues I found in this project
- One of the provided API, `https://hahow-recruit.herokuapp.com/heroes/:heroId`, randomly responses with undesired body `{ code: 1000, ... }`, causing the HTTP request getting incorrect data. To handle this, I retry the specific request up to 7 times when getting the 1000 code. If the server cannot get correct response in 7 retries, respond to client with status code 503 (Service Unavailable).
- The authentication headers, Name and Password, might fail due to incorrect keys or values. In these cases, instead of sending error messages like 401 back, I fallback the behavior to return the unauthenticated version of requested data (not having the profile field).
