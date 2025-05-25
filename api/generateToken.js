import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

export default function handler(req, res) {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const { channel, uid } = req.query;

  if (!appId || !appCertificate) {
    return res.status(500).json({ error: 'Missing App ID or Certificate' });
  }

  if (!channel || !uid) {
    return res.status(400).json({ error: 'Missing channel or uid' });
  }

  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 84600; // 1h
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  try {
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channel,
      parseInt(uid),
      role,
      privilegeExpiredTs
    );

    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ error: 'Token generation failed', details: e.message });
  }
}

