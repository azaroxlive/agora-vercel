const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

module.exports = (req, res) => {
  const appId = process.env.9e8dc5a99fb240a8bd6513630c14a45c;
  const appCertificate = process.env.0b1ec530eb22494486b4c7a6b234b18c;
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
