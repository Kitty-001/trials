// database/seed.js
const { query } = require('./db');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

async function seedDatabase() {
  try {
    // Generate 100,000 dummy contacts
    for (let i = 0; i < 100000; i++) {
      const phoneNumber = `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      await query('INSERT INTO contacts (phone_number) VALUES ($1)', [phoneNumber]);
    }

    console.log('100,000 contacts generated.');

    // Load message content from CSV
    const csvData = await fs.readFile('message_content.csv', 'utf8');
    const messages = csvData.split('\n').slice(1); // Skip header

    // Generate 5 million messages
    const totalMessages = 5000000;
    const contactsCount = 100000;
    for (let i = 0; i < totalMessages; i++) {
      const contactId = Math.floor(Math.random() * contactsCount) + 1;
      const randomMessageIndex = Math.floor(Math.random() * messages.length);
      const content = messages[randomMessageIndex];
      await query('INSERT INTO messages (contact_id, content) VALUES ($1, $2)', [contactId, content]);
    }

    console.log('5,000,000 messages generated.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();