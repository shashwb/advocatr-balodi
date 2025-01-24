import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

/**
 * TO IMRPOVE:
 * - this seed advocates, but doesn't have any error handing
 * - No typescript type protections -- should have access to Advocates interface!
 * - this is NOT idempotent, RE-RUNS will add duplicates
 *    (this is fine, should just make people aware, but I doubt this is
 *      really relevant for this assignment...right? :) );
 * Not great, but gets the job done...moving on!
 * @returns unformatted Advocates records.
 */
export async function POST() {
  const records = await db.insert(advocates).values(advocateData).returning();

  return Response.json({ advocates: records });
}
