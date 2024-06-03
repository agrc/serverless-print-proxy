import Firestore from '@google-cloud/firestore';
import accounts from '../accounts.js';

const firestore = new Firestore();

for (const accountNumber in accounts) {
  const account = accounts[accountNumber];

  console.log(`Migrating account: ${accountNumber}`);

  await firestore
    .collection('accounts')
    .doc(accountNumber)
    .set({
      ...account,
      contact: null,
      notes: null,
    });
}
