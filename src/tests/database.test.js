import {Database, hashPassword} from './../database/database';
import {runTest} from '../tests/testRunner';

async function TestDatabase() {
  const hash = '465426e4f39be33ca772796494ceb605727d7fa97e37eaf16874c61407d6169e';
  const newHash = '7d641d223e9dea7cd4fc4c7e5e7a3c8bfc7232e43f1a8d066ea80102382465b8';

  let result;
  const db = new Database();
  await db.init();

  result = await db.addUser('alex', 'hello!');
  runTest('Add user to database', result.success === true);

  result = await db.getPassword('alex');
  runTest('Password hashes match', result.password === hash);

  result = await db.addUser('alex', 'hunter2');
  runTest('Duplicate addition noCreds', result.success === false);

  // this tests depends on salt being 'hello_i_am_a_salt'
  result = hashPassword('hello!');
  runTest('Hash function returns correct result', result.success === true && result.hash === hash);

  result = await db.getPassword('not alex');
  runTest('Fetching password of unknown user returns undefined', result === undefined);

  await db.addUser('not alex', 'hello!');
  await db.deleteUser('alex');
  result = await db.db.all('SELECT username FROM users');
  runTest('Confirm user removal', result.length === 1);

  result = await db.changePassword('not alex', 'wrong_pw', 'something');
  runTest('Change password using wrong password fails', result.success === false);

  result = await db.changePassword('not_a_user', '', '');
  runTest('Changing password of absent user returns failure', result.success === false);

  result = await db.changePassword('not alex', 'hello!', 'new_password');
  runTest('Change password returns success', result.success === true);
  result = await db.getPassword('not alex');
  runTest('Confirm password changed', result.password === newHash);
}

TestDatabase();
