import crypto from 'crypto';
import env from '../env'
import sqlite from 'sqlite';


export class Database {
  constructor() {
    this.file = env.dbFile;
  }

  /**
   * Creates tables in database.  This isn't called in the constructor as it is synchronous,
   * and this function is async.
   * @return {Promise<void>}
   */
  async init() {
    this.db = await sqlite.open(this.file);
    await this.db.run('CREATE TABLE IF NOT EXISTS users (username TEXT UNIQUE, password TEXT)')
  }

  /**
   * @param username {String}
   * @param password {String}
   * @return {Promise<{success: boolean, message: string}>}
   */
  async addUser(username, password) {
    if (!this.db) await this.init();
    const result = {};
    try {
      const pw = hashPassword(password);
      if (!pw.success) {
        result.success = false;
        result.message = 'password error';
        return result;
      }
      await this.db.run('INSERT INTO users (username, password) VALUES (?,?)', username, pw.hash);
    }
    catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT') {
        result.success = false;
        result.message = 'unique name failure';
        return result;
      }
    }
    result.success = true;
    result.message = 'registered successfully';
    return result;
  }

  /**
   * @param username {String}
   * @return {Promise<void>}
   */
  async deleteUser(username) {
    if (!this.db) await this.db.init();
    await this.db.run('DELETE FROM users WHERE username = ?', username);
  }

  /**
   * Gets password of username.  Returns {password: $passwordHash} if username is in
   * database, undefined otherwise
   * @param username {String}
   * @return {Promise<{password: String} || undefined>}
   */
  async getPassword(username) {
    if (!this.db) await this.init();
    return await this.db.get('SELECT password from users WHERE username = ?', username);
  }

  /**
   *
   * @param username {String}
   * @param oldPassword {String}
   * @param newPassword {String}
   * @return {Promise<{success:boolean, message: String}>}
   */
  async changePassword(username, oldPassword, newPassword) {
    const result = {};
    const failureText = 'bad username or password';
    const oldPwHash = hashPassword(oldPassword).hash;
    const newPwHash = hashPassword(newPassword).hash;
    const pw = await this.getPassword(username);
    if (!pw || pw.password !== oldPwHash) {
      result.success = false;
      result.message = failureText;
      return result;
    }
    await this.db.run('UPDATE users SET password = ? WHERE username = ?', newPwHash, username);
    result.success = true;
    result.message = 'password updated';
    return result;
  }
}

/**
 * Creates password hash of password
 * @param password {String}
 * @return {{success: boolean, hash: String}}
 */
export function hashPassword(password) {
  const salt = env.salt;
    if (salt === undefined) {
      return {success: false, hash: undefined};
    }
  try {
    const hash = crypto.pbkdf2Sync(password, salt, 10, 32, 'sha512').toString('hex');
    if (hash) return {success:true, hash: hash};
  }
  catch (e) {
    return {success: false, hash: undefined}
  }
}
