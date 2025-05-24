const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

module.exports = (req, res) => {
  const appId = process.env.APP_ID;
  const appCertificate = process.env.APP_CERTIFICATE;

  const channelName = req.query.channelName;
  const uid = req.query.uid;

  if (!appId || !appCertificate) {
    return res.status(500).json({ error: "App ID et certificat manquants dans les variables d'environnement" });
  }

  if (!channelName || !uid) {
    return res.status(400).json({ error: "Paramètres channelName et uid requis" });
  }

  const role = RtcRole.PUBLISHER;  // Host ou participant avec droit de parler
  const expirationTimeInSeconds = 86400; // 24h
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTs = currentTimestamp + expirationTimeInSeconds;

  try {
    const token = RtcTokenBuilder.buildTokenWithAccount(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpireTs
    );

    return res.status(200).json({
      token,
      rtcUid: uid,
    });
  } catch (error) {
    return res.status(500).json({ error: "Erreur génération token: " + error.message });
  }
};
