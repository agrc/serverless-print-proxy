import { Firestore } from '@google-cloud/firestore';

// Update emulator Firestore database with test data

const emulator = new Firestore({
  host: 'localhost',
  port: 8081,
  ssl: false,
});

type TestAccount = {
  arcgisServer: string;
  quadWord: string;
};

const testAccounts: Record<string, TestAccount> = {
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

for (const [accountNumber, data] of Object.entries(testAccounts)) {
  console.log(`Seeding test account ${accountNumber}`);
  await emulator.collection('accounts').doc(accountNumber).set(data);
}
