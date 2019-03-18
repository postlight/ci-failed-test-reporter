import { getReport } from '../index';

describe('getReport', () =>
  test('returns formatted test report', () => {
    // don't test the whitespace formatting, just the content
    const testReport = getReport(__dirname + '/test-output.test.json').replace(
      /\s/g,
      ''
    );
    expect(testReport.startsWith('<details>')).toBeTruthy();
  }));
