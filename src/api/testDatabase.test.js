import Database from './database';
import testRunner from '../test/testRunner';

async function TestDatabase() {
  const db = new Database(':memory:');
  await db.init();


}

TestDatabase();
