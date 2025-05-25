import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export default function handler(req, res) {
  const appId = "9e8dc5a99fb240a8bd6513630c14a45c";
  const appCertificate = "0b1ec530eb22494486b4c7a6b234b18c";
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
