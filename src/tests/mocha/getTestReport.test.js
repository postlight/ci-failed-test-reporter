const stripAnsi = require('strip-ansi');
const path = require('path');
const assert = require('assert');

const getTestReport = require('../../getTestReport');

describe('basic test', () => {
  it('Generates a test report', () => {
    // don't test the whitespace formatting, just the content
    const testReport = stripAnsi(
      getTestReport(path.join(__dirname, '../', '/test-output.test.json'))
    ).replace(/\s/g, '');
    assert.equal(testReport.startsWith('<details>'), true);
  });

  it('Returns empty string if there are no failed tests', () => {
    // don't test the whitespace formatting, just the content
    const testReport = getTestReport(
      path.join(__dirname, '/nonexistent.test.json')
    ).replace(/\s/g, '');
    assert.equal(testReport, '');
  });

  it('Adds 2 + 2', () => assert.equal(2 + 2, 5));
  it('Adds 2 + 2 again', () => assert.equal(2 + 2, 5));
});
