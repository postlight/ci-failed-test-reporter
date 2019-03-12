import stripAnsi from 'strip-ansi';

import getTestReport from '../getTestReport';

const sampleReport = `<details> <summary> <b>1 failed tests 😱</b> </summary> --- **basic test** <details> <summary> See what went wrong </summary> \`\`\`bash Error: expect(received).toBe(expected) // Object.is equality Expected: 16 Received: 11 at Object.<anonymous>.test(/Users/frankiesimms / Desktop / nodejs - typescript - kit / src / index.test.ts: 2: 21) at Object.asyncJestTest(/Users/frankiesimms / Desktop / nodejs - typescript - kit / node_modules / jest - jasmine2 / build / jasmineAsyncInstall.js: 102: 37) at resolve(/Users/frankiesimms / Desktop / nodejs - typescript - kit / node_modules / jest - jasmine2 / build / queueRunner.js: 41: 12) at new Promise(<anonymous>) at mapper (/Users/frankiesimms/Desktop/nodejs-typescript-kit/node_modules/jest-jasmine2/build/queueRunner.js:26:19) at promise.then (/Users/frankiesimms/Desktop/nodejs-typescript-kit/node_modules/jest-jasmine2/build/queueRunner.js:71:41) at process._tickCallback (internal/process/next_tick.js:68:7) \`\`\` </details> --- </details > `;

test('Generates a test report', () => {
  // don't test the whitespace formatting, just the content
  const testReport = stripAnsi(
    getTestReport(__dirname + '/test-output.test.json')
  ).replace(/\s/g, '');
  expect(testReport).toBe(sampleReport.replace(/[\s]*/g, ''));
});
