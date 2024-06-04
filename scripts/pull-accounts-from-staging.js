import { Firestore } from '@google-cloud/firestore';

// update emulator firestore database with staging database

const staging = new Firestore();

const emulator = new Firestore({
  host: 'localhost',
  port: 8081,
  ssl: false,
});

const stagingAccounts = await staging.collection('accounts').get();

for (const doc of stagingAccounts.docs) {
  const data = doc.data();
  console.log(`Seeding staging account ${doc.id}`);
  await emulator.collection('accounts').doc(doc.id).set(data);
}
