const dotenv = require('dotenv');
const nodeFetch = require("node-fetch");
dotenv.config();
const getTestReport = require('./getTestReport');
const stripAnsi = require('strip-ansi');

function comment(filepath: string) {
  const username = process.env.CIRCLE_PR_USERNAME || process.env.PR_USERNAME;
  const repoName = process.env.CIRCLE_PR_REPONAME || process.env.PR_REPONAME;
  const prNumber = process.env.CIRCLE_PR_NUMBER || process.env.PR_NUMBER;

  const request: any = {
    method: 'POST',
    body: JSON.stringify({ body: stripAnsi(getTestReport(filepath)) }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_API_KEY}`,
      'User-Agent': username
    }
  };

  nodeFetch(
    `https://api.github.com/repos/${username}/${repoName}/issues/${prNumber}/comments`,
    request
  ).then((res: any) => { console.log(res)});
}

function getReport(filepath: string) {
  return stripAnsi(getTestReport(filepath));
}

module.exports = {
  comment,
  getReport
};
