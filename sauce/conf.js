var browsers = require('./browsers');
module.exports  = {
  all: {
    options: {
      urls: ['localhost:3210/test/index.html'],
      build: process.env.CI_BUILD_NUMBER || 0,
      testname: 'Ramda Sauce Unit Test',
      browsers: browsers
    }
  }
};
