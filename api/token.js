const Agora = require('agora-access-token');

module.exports = (req, res) => {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const channelName = req.query.channel;
  const uid = req.query.uid || 0;
  const role = Agora.RtcRole.PUBLISHER;
  const expiration = 86400; // 24h

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
