/**
 * @param username {String}
 * @param password {String}
 * @param password2 {String}
 * @return {{success: boolean, message: string}}
 */
export function validateCreds(username, password, password2) {
  const result = {success: false, message: ''};
  if (username.length < 4) {
    result.message = 'usernames must have at least 4 characters.';
    return result;
  }
  else if (hasWhitespace(username)) {
    result.message = 'whitespace is not allowed in username.';
    return result;
  }
  else if (password !== password2 || password.length < 12) {
    result.message = 'passwords must match and have at least 12 characters.';
    return result;
  }
  result.success = true;
  result.message = 'potentially valid credentials';
  return result;
}

/**
 * Returns true if whitespace is present in string, false otherwise
 * @param string
 * @return {boolean}
 */
function hasWhitespace(string) {
  return /\s/.test(string);
}