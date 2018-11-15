const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  reset: "\x1b[0m",
};


/**
 * Prints pass/fail message, this time with colors!
 * @param testDesc string
 * @param testResult boolean
 * @return boolean
 */
export function runTest (testDesc, testResult) {
  let text;
  if (testResult) {
    text = `${testDesc}: ${colors.green}Pass${colors.reset}`
  } else {
    text = `${testDesc}: ${colors.red}Fail${colors.reset}`
  }
  console.log(text);
  return testResult;
}
