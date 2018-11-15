import bodyParser from 'body-parser';
import express from 'express';

import {Database} from "../database/database";
import {getEnv} from "../../scratch";

export async function API() {
  const PORT = getEnv().apiPort;
  const db = new Database();

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  /**
   * Used to add users to database
   */
  app.post('/api/v1/users', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.status(400).send({
        success: 'false',
        message: 'username and password are required',
      });
    }
    const result = await db.addUser(username, password);
    if (!result.success) {
      switch (result.message) {

        case 'unique name failure':
          return res.status(400).send(result);

        case 'password error':
          return res.status(500).send(result);

        default:
          return res.status(500).send({
            success: 'false',
            message: '500 internal server error',
          });
      }
    }
    return res.status(201).send(result);
  });

  /**
   * Used to change password
   */
  app.put('/api/v1/users', async (req, res) => {
    const username = req.body.username;
    const oldPw = req.body.oldPw;
    const newPw = req.body.newPw;

    if (!username || !oldPw || !newPw) return res.status(400).send({
      success: 'false',
      message: 'username, oldPw and newPw are required',
    });

    const result = await this.db.changePassword(username, oldPw, newPw);
    if (!result.success) {
      return res.status(400).send(result);
    }
    return res.status(200).send(result);
  })


}