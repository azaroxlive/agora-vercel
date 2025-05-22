const Agora = require('agora-access-token');

module.exports = (req, res) => {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const channelName = req.query.channel; // 🔥 corrigé
  const uid = parseInt(req.query.uid) || 0; // 🔥 corrigé
  const role = Agora.RtcRole.PUBLISHER;
  const expiration = 86400; // 24h

  if (!appId || !appCertificate || !channelName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const token = Agora.RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    expiration
  );

  res.json({
    token: token,
    rtcUid: uid
  });
};
