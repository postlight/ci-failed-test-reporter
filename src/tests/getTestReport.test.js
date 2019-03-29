import stripAnsi from 'strip-ansi';

import getTestReport from '../getTestReport';

describe('getTestReport', () =>
  test('Generates a test report', () => {
    // don't test the whitespace formatting, just the content
    const testReport = stripAnsi(
      getTestReport(__dirname + '/test-output.test.json')
    ).replace(/\s/g, '');
    expect(testReport.startsWith('<details>')).toBeTruthy();
  }));
