const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

module.exports = (req, res) => {
  const appId = process.env.APP_ID;
  const appCertificate = process.env.APP_CERTIFICATE;

  const channelName = req.query.channelName;
  const uid = req.query.uid;
  const role = RtcRole.PUBLISHER;
  const expiration = 86400; // 24h

  if (!appId || !appCertificate || !channelName || !uid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const token = RtcTokenBuilder.buildTokenWithAccount(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    Math.floor(Date.now() / 1000) + expiration
  );

  return res.status(200).json({
    token,
    rtcUid: uid
  });
};
