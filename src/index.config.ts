import {writeFile} from 'fs';

import {name, version} from '../package.json';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   firebaseConfig: '${process.env.FIREBASE_CONFIG}',
    name: '${name}',
    version: '${version}'
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});