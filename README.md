# CI Failed Test Reporter

A familiar scene: you open up a PR only to see that your CircleCI build failed because of some tests that didn't pass. But which tests? GitHub won't tell you. Your best options for finding out include opening a console and running your test suite locally or manually sifting through the CI logs, and neither of these is as efficient as you'd like. We at [Postlight](https://www.postlight.com) built this tool to facilitate this process—when your CI build breaks due to failing tests, it reads the JSON test report generated by your testing tool, formats it into markdown, and posts it as a comment directly on your PR. With this tool, you can see which tests broke the build in the same place you find out it's broken.


## Setup

### `yarn install`

Ciftr is published as an npm package, so installing it is as easy as running `yarn add @postlight/ci-failed-test-reporter` or `npm install @postlight/ci-failed-test-reporter`, depending on your tool of choice.

### CircleCI config

Ciftr currently only works with CircleCI, but we're looking into opening it up to other CI solutions. If you haven't set up CircleCI yet, head over to [this page](https://circleci.com/docs/2.0/getting-started/#section=getting-started) to get started. After you've created your `.circleci/config.yml` file, there are two `run` blocks you'll need to add to it, detailed below.

```yml
  # exports CircleCI env variables so they can be referenced in your code
  # put this near the top of your yml file, like after the `checkout` step
  - run:
      name: Define Environment Variables at Runtime
      command: |
        echo 'export PR_REPONAME=${CIRCLE_PROJECT_REPONAME}' >> $BASH_ENV
        echo 'export PR_USERNAME=${CIRCLE_PROJECT_USERNAME}' >> $BASH_ENV
        # grep just the pr number from the PR URL
        echo 'export PR_NUMBER=$(echo $CIRCLE_PULL_REQUEST | grep -Eo "\/pull\/([0-9]+)" | grep -Eo "[0-9]+")' >> $BASH_ENV
        source $BASH_ENV
```

```yml
  - run: yarn test
  - run:
      name: Upload Test Report
      command: yarn ciftr /path-to-test-report.json
      when: on_fail
```

You can check out [this repo's CircleCI config](/.circleci/config.yml) for an example, but be careful not to copy and paste the `Upload Test Report` command, as it's set up for this repo specifically and won't work with yours.

### `package.json` setup

You will need to make sure that you have a `package.json` test script that is set up to export test results to a file in the root directory of your repo. Using Jest, this yarn/npm script will look like `jest --json --outputFile test-output.json`. This test script then needs to be invoked during the test step of your CircleCI build process. You can check out [this repo's package.json](/package.json) for some guidance.

### Environment variables

The only environment variable you need to define for use with CircleCI is `GITHUB_API_KEY`, which must be populated with your GitHub API key. This can be the API key of any user with access to the repo—at Postlight we've so far used it with our `postlight-bot` user, and creating your own bot might be a useful idea. The rest of the necessary environment variables are built in to CircleCI and are exported in your CircleCI config file, as detailed [above](#CircleCI Config). 
