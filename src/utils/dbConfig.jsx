import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://neondb_owner:OvphBLg5Ywk3@ep-bold-butterfly-a1gdgkac.ap-southeast-1.aws.neon.tech/beat_cancer?sslmode=require"
);
export const db = drizzle(sql, { schema });