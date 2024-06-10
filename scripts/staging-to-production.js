import { Firestore } from '@google-cloud/firestore';

// update production firestore database from staging database

const staging = new Firestore();

const production = new Firestore({
  projectId: '<project-id>',
});

const stagingAccounts = await staging.collection('accounts').get();

for (const doc of stagingAccounts.docs) {
  const data = doc.data();
  console.log(`Seeding staging account ${doc.id}`);
  await production.collection('accounts').doc(doc.id).set(data);
}
