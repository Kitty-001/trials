// controllers/searchController.js
const { query } = require('../database/db');

const searchConversations = async (req, res) => {
  const { searchValue } = req.query;
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
      WHERE c.id = m.contact_id AND m.created_at = (
          SELECT MAX(created_at)
          FROM messages
          WHERE contact_id = c.id
      ) AND (
          c.phone_number LIKE $1 OR
          m.content LIKE $1
      )
      ORDER BY
          m.created_at DESC
      LIMIT $2 OFFSET $3
    `, [`%${searchValue}%`, pageSize, offset]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error searching conversations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchConversations };