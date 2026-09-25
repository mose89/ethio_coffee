import type { CollectionConfig } from "payload";
import { authenticated } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email", group: "Settings", defaultColumns: ["name", "email"] },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8-hour sessions
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: { secure: process.env.NODE_ENV === "production", sameSite: "Lax" },
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [{ name: "name", type: "text" }],
};
