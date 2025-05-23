const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
console.log("RTC TOKEN API CALLED");

module.exports = (req, res) => {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const channelName = req.query.channelName;
  const uid = req.query.uid;

  const role = RtcRole.PUBLISHER;
  const expiration = 86400; // 24h
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTimestamp + expiration;

  if (!appId || !appCertificate || !channelName || !uid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    parseInt(uid),
    role,
    privilegeExpireTime
  );

  return res.status(200).json({
    token: token,
    rtcUid: uid
  });
};
