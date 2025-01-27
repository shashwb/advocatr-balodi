import db from "../../../db";
import { advocates, Advocate } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextResponse } from "next/server";

/**
 * IMPROVEMENTS:
 * + add typescript types and interfaces
 * + add error handling and proper HTTP status codes
 * + implemented idempotency for seeding logic for development
 */

export interface SeedResponse {
  message: string;
  inserted?: Advocate[];
}

export interface ErrorResponseBody {
  error: string;
}

/**
 * Seeds the database with example advocate data for development.
 */
export async function POST(): Promise<
  NextResponse<SeedResponse | ErrorResponseBody>
> {
  try {
    // Check if the table already has data, if so we don't need to seed
    const existingAdvocates = await db.select().from(advocates).limit(1);

    if (existingAdvocates.length > 0) {
      return NextResponse.json<SeedResponse>(
        { message: "Seed data already exists" },
        { status: 400 }
      );
    }

    // Seed the database with example advocate data
    const insertedAdvocates = await db
      .insert(advocates)
      .values(advocateData)
      .returning();

    return NextResponse.json<SeedResponse>(
      { message: "Seed data added successfully", inserted: insertedAdvocates },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json<ErrorResponseBody>(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
