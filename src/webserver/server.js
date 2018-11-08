import fs from 'fs';
import https from 'https';
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/jakk.zapto.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jakk.zapto.org/chain.pem'),
};

