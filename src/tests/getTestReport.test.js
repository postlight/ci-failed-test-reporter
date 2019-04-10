import stripAnsi from 'strip-ansi';
import assert from 'assert';
import path from 'path';

import getTestReport from '../getTestReport';

describe('getTestReport', () => {
  test('Generates a test report', () => {
    // don't test the whitespace formatting, just the content
    const testReport = stripAnsi(
      getTestReport(path.join(__dirname + '/test-output.test.json'))
    ).replace(/\s/g, '');
    expect(testReport.startsWith('<details>')).toBeTruthy();
  });

  test('Returns empty string if there are no failed tests', () => {
    // don't test the whitespace formatting, just the content
    const testReport = getTestReport(
      path.join(__dirname, '/nonexistent.test.json')
    ).replace(/\s/g, '');
    expect(testReport).toBeFalsy();
  });

  it('Adds 2 + 2', () => assert.equal(2 + 2, 5));
});
