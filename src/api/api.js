import bodyParser from 'body-parser';
import express from 'express';

import {Database} from "../database/database";
import {credentials} from "../utilities/validate";
import env from './../env.json';

export async function API() {
  const PORT = env.apiPort; // TODO add error handling to accessing env.json.
  const db = new Database();

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  /**
   * Enable cors  TODO specify domains, if possible.
   */
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  /**
   * Used to add users to database
   */
  app.post('/api/v1/users', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const isValid = credentials(username, password, password2);
    if (!isValid.success) {
      return res.status(400).send(isValid);
    }
    const result = await db.addUser(username, password);
    if (!result.success) {
      // I'm leaving this as a switch statement in case I add additional failure messages.
      switch (result.message) {
        case 'unique name failure':
          result.message = 'choose a different name';
          return res.status(400).send(result);
        default:
          return res.status(500).send({
            success: false,
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
      success: false,
      message: 'username, oldPw and newPw are required',
    });

    const result = await db.changePassword(username, oldPw, newPw);
    if (!result.success) {
      return res.status(400).send(result);
    }
    return res.status(200).send(result);
  });

  return app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`)
  })
}
