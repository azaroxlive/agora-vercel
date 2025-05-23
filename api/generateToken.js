const Agora = require('agora-access-token');

module.exports = (req, res) => {
  const appId = process.env.9e8dc5a99fb240a8bd6513630c14a45c;
  const appCertificate = process.env.0b1ec530eb22494486b4c7a6b234b18c;
  const channelName = req.query.channelName;
  const uid = req.query.uid;
  const role = RtcRole.PUBLISHER;
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
