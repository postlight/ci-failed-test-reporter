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

const multiplier = (num1, num2) => num1 * num2;

describe('multiplier', () => {
  test('multiplies two numbers', () => {
    expect(multiplier(10, 10)).toEqual(100);
  });

  test('multiplies three numbers', () => {
    expect(multiplier(10, 10, 10)).toEqual(1000);
  });
});
