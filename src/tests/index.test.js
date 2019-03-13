import { getReport } from '../index';
import sampleReport from './sample-report';

test('getReport: returns formatted test report', () => {
  // don't test the whitespace formatting, just the content
  const testReport = getReport(__dirname + '/test-output.test.json').replace(
    /\s/g,
    ''
  );
  expect(testReport).toBe(sampleReport.replace(/[\s]*/g, ''));
});
