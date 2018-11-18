/**
 * @param username {String}
 * @param password {String}
 * @param password2 {String}
 * @return {{success: boolean, message: string}}
 */
export function validateCreds(username, password, password2) {
  const result = {success: false, message: ''};
  if (!username || !password || !password2) {
    result.message = 'missing username, password or password2';
    return result;
  }
  else if (username.trim().length === 0) {
    result.message = 'blank usernames are not allowed';
    return result;
  }
  else if (password !== password2 || password.length < 12) {
    result.message = 'password and password2 must be identical and at least 12 characters';
    return result;
  }
  result.success = true;
  return result;
}
