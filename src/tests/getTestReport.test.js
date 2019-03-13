import stripAnsi from 'strip-ansi';

import getTestReport from '../getTestReport';
import sampleReport from './sample-report';

test('Generates a test report', () => {
  // don't test the whitespace formatting, just the content
  const testReport = stripAnsi(
    getTestReport(__dirname + '/test-output.test.json')
  ).replace(/\s/g, '');
  expect(testReport).toBe(sampleReport.replace(/[\s]*/g, ''));
});
