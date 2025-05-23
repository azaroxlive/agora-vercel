const Agora = require('agora-access-token');

module.exports = (req, res) => {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const channelName = req.query.channel; // 🔥 corrigé
  const uid = parseInt(req.query.uid);
  if (isNaN(uid)) return res.status(400).json({ error: 'Invalid uid' });
  const role = Agora.RtcRole.PUBLISHER;
  const expiration = 86400; // 24h

  if (!appId || !appCertificate || !channelName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

const token = Agora.RtcTokenBuilder.buildTokenWithAccount(
  appId,
  appCertificate,
  channelName,
  uid, // string comme 'uabc123'
  role,
  expiration
);

  res.json({
    token: token,
    rtcUid: uid
  });
};
