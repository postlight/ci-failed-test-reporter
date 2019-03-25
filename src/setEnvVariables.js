const dotenv = require('dotenv');
dotenv.config();

if (process.env.TRAVIS && process.env.TRAVIS_PULL_REQUEST) {
  process.env.PR_NUMBER = process.env.TRAVIS_PULL_REQUEST;
  process.env.PR_REPONAME = process.env.TRAVIS_PULL_REQUEST.split('/')[1];
  process.env.PR_USERNAME = process.env.TRAVIS_PULL_REQUEST.split('/')[0];
}
