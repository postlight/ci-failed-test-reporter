const isMocha = json => !!json.stats;
const isJest = json => !!json.numFailedTestSuites;

const jsonToResultsObject = json => {
  if (isMocha) {
    const { failures } = json;
    const failedTests = failures.map(failure => ({
      fullName: failure.fullTitle,
      failureMessages: failure.err.stack
    }));

    return {
      ...json,
      failedTests
    };
  }

  if (isJest) {
    const { testResults } = json;
    const failedTests = testResults
      .map(({ assertionResults }) =>
        assertionResults.filter(({ status }) => status !== 'passed')
      )
      .reduce((acc, arr) => acc.concat(arr));
    return {
      ...json,
      failedTests
    };
  }

  throw 'JSON test report not in a recognized format';
};

export default jsonToResultsObject;
