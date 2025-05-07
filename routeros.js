const RouterOSClient = require('routeros-api').RouterOSClient;

const client = new RouterOSClient({
  host: process.env.MIKROTIK_HOST,
  user: process.env.MIKROTIK_USER,
  password: process.env.MIKROTIK_PASS,
});

async function addHotspotUser(username, password, profile) {
  await client.connect();
  const api = client.api;

  await api.write('/ip/hotspot/user/add', [
    `=name=${username}`,
    `=password=${password}`,
    `=profile=${profile}`,
  ]);

  await client.close();
}

module.exports = { addHotspotUser };
