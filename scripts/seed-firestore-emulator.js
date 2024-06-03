import { Firestore } from '@google-cloud/firestore';

// update emulator firestore database with staging database and test data

const staging = new Firestore();

const emulator = new Firestore({
  host: 'localhost',
  port: 8081,
  ssl: false,
});

const testAccounts = {
  '-3': {
    arcgisServer: 'https://wrimaps.utah.gov',
    quadWord: 'async-job-quad-word',
  },
  '-2': {
    arcgisServer: 'http://127.0.0.1:8085',
    quadWord: 'verify-quad-word',
  },
  '-1': {
    arcgisServer: 'https://utility.arcgisonline.com',
    quadWord: 'test-quad-word',
  },
};

for (const accountNumber in testAccounts) {
  console.log(`Seeding test account ${accountNumber}`);
  const data = testAccounts[accountNumber];

  await emulator.collection('accounts').doc(accountNumber).set(data);
}

const stagingAccounts = await staging.collection('accounts').get();

for (const doc of stagingAccounts.docs) {
  const data = doc.data();
  console.log(`Seeding staging account ${doc.id}`);
  await emulator.collection('accounts').doc(doc.id).set(data);
}
