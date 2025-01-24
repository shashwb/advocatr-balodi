import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

/** TODO:
 * - use database to get advocates (ensure database is created and seeded)
 * - handle errors and logging
 * - missing typescript
 * - pagination and filtering would be useful if datasets grow large
 */
export async function GET(request: Request) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const data = advocateData;

  return Response.json({ data });
}
