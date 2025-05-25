import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export default function handler(req, res) {
  const appId = "TON_AGORA_APP_ID";
  const appCertificate = "TON_AGORA_CERTIFICATE";
  const channelName = req.query.channel;
  const uid = req.query.uid;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 86400;

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    parseInt(uid),
    role,
    privilegeExpiredTs
  );

  res.status(200).json({ token });
}
