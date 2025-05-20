const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

module.exports = (req, res) => {
  const APP_ID = '9e8dc5a99fb240a8bd6513630c14a45c';
  const APP_CERTIFICATE = '0b1ec530eb22494486b4c7a6b234b18c';

  const channelName = req.query.channelName;
  const uid = parseInt(req.query.uid) || 0;

  if (!channelName) {
    return res.status(400).json({ error: 'channelName requis' });
  }

  const role = RtcRole.PUBLISHER;
  const expireTime = 3600;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  res.status(200).json({ token });
};