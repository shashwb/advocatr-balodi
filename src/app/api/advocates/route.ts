import db from "../../../db"; // Database connection
import { advocates, Advocate } from "../../../db/schema"; // Schema
import { sql } from "drizzle-orm"; // SQL utility for complex conditions
import { NextResponse } from "next/server"; // Response handling for Next.js

export async function GET(request: Request) {
  const MAX_LIMIT = 50;

  try {
    // Parse query parameters
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");
    const limitParam = url.searchParams.get("limit");
    const search = url.searchParams.get("search")?.toLowerCase() || "";

    const page = pageParam ? parseInt(pageParam) : 1;
    const limit = limitParam ? parseInt(limitParam) : 9;

    // Validate pagination parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page parameter: page must be a positive integer" },
        { status: 400 }
      );
    }
    if (isNaN(limit) || limit <= 0 || limit > MAX_LIMIT) {
      return NextResponse.json(
        {
          error:
            "Invalid limit parameter: limit must be a positive integer between 1 and 50",
        },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;
    let advocatesDbResponse;

    if (search === "") {
      advocatesDbResponse = await db
        .select()
        .from(advocates)
        .limit(limit)
        .offset(offset);
    } else {
      advocatesDbResponse = await db
        .select()
        .from(advocates)
        .where(
          sql`${advocates.firstName} ILIKE ${`%${search}%`} OR
             ${advocates.lastName} ILIKE ${`%${search}%`} OR
             ${advocates.city} ILIKE ${`%${search}%`} OR
             ${advocates.degree} ILIKE ${`%${search}%`}`
        )
        .limit(limit)
        .offset(offset);
    }

    // Handle no results
    if (advocatesDbResponse.length === 0) {
      return NextResponse.json(
        { error: "No advocates found" },
        { status: 404 }
      );
    }

    // Map results to Advocate type
    const data: Advocate[] = advocatesDbResponse.map((record) => ({
      ...record,
      specialties: record.specialties as string[],
    }));

    // Return the paginated response
    return NextResponse.json({ data, page, limit }, { status: 200 });
  } catch (error: unknown) {
    // Handle errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "The API suffered a server-side error, please contact support",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
