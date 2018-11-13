// import dotenv from 'dotenv';
import sqlite from 'sqlite';
// dotenv.config();


class Database {
  constructor(file) {
    this.file = file;
  }

  async init() {
    this.db = await sqlite.open(this.file);
    await this.db.run('CREATE TABLE IF NOT EXISTS users (username TEXT UNIQUE, password TEXT)')
  }

  async getPeople() {
    if (!this.db) await this.init();
    return await this.db.all('SELECT rowid, username FROM users');
  }

}

export default Database;