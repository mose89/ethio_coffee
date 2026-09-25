/**
 * Creates (or resets the password of) a CMS admin user from environment variables.
 * Use this on a new server BEFORE the site is public, so nobody else can claim
 * the "create first user" screen.
 *
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a long passphrase' npm run create-admin
 */
export {};

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!email || !password || password.length < 12) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters).");
  process.exit(1);
}
const { getPayload } = await import("payload");
const config = (await import("@payload-config")).default;
const payload = await getPayload({ config });
const existing = await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1 });
if (existing.docs[0]) {
  await payload.update({ collection: "users", id: existing.docs[0].id, data: { password } });
  payload.logger.info(`Password updated for ${email}`);
} else {
  await payload.create({ collection: "users", data: { email, password, name: process.env.ADMIN_NAME || "" } });
  payload.logger.info(`Admin user created: ${email}`);
}
process.exit(0);
