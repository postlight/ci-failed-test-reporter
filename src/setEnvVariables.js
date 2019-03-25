const dotenv = require('dotenv');
dotenv.config();

const setEnvVariables = () => {
  if (process.env.TRAVIS && process.env.TRAVIS_PULL_REQUEST) {
    process.env.PR_NUMBER = process.env.TRAVIS_PULL_REQUEST;
    process.env.PR_REPONAME = process.env.TRAVIS_PULL_REQUEST_SLUG.split(
      '/'
    )[1];
    process.env.PR_USERNAME = process.env.TRAVIS_PULL_REQUEST_SLUG.split(
      '/'
    )[0];
    console.log(process.env.PR_NUMBER);
    console.log(process.env.PR_REPONAME);
    console.log(process.env.PR_USERNAME);
  }
};

module.exports = setEnvVariables;
