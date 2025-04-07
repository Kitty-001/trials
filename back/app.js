// app.js
const express = require('express');
const app = express();
const conversationRoutes = require('./routes/conversationRoutes');

app.use(express.json());

app.use('/conversations', conversationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});