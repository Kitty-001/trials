// controllers/conversationController.js
const { query } = require('../database/db');

const getRecentConversations = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 50;
  const offset = (page - 1) * pageSize;

  try {
    const result = await query(`
      SELECT
          c.id AS contact_id,
          c.phone_number,
          m.content AS last_message,
          m.created_at AS last_message_time
      FROM
          contacts c
      INNER JOIN
          messages m ON c.id = m.contact_id
      WHERE m.created_at = (
          SELECT MAX(created_at)
          FROM messages
          WHERE contact_id = c.id
      )
      ORDER BY
          m.created_at DESC
      LIMIT $1 OFFSET $2
    `, [pageSize, offset]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching recent conversations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getRecentConversations };