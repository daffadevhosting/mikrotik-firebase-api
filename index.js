require('dotenv').config();
const express = require('express');
const db = require('./firebase');
const { addHotspotUser } = require('./routeros');

const app = express();
app.use(express.json());

app.post('/inject-users', async (req, res) => {
  try {
    const snapshot = await db.ref('hotspotUsers').once('value');
    const users = snapshot.val();

    if (!users) return res.status(404).json({ message: 'No users found' });

    for (const key in users) {
      const user = users[key];
      await addHotspotUser(user.username, user.password, user.profile);
    }

    res.json({ message: 'Users injected to MikroTik' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal inject user' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
