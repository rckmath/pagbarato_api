import * as FirebaseClient from 'firebase-admin';

import Constants from '@configs/constants.config';

(async () => {
  FirebaseClient.initializeApp({ credential: FirebaseClient.credential.cert(Constants.firebaseCredentials) });
})();

export default FirebaseClient;
