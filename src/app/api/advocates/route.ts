import { PgSelectBase } from "drizzle-orm/pg-core";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextResponse } from "next/server";

/**
 * IMPROVEMENTS:
 * + add typescript types
 * + replaced mocks with db query
 * + add error handling
 * + add pagination
 */

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

/**
 * Handles GET requests to fetch paginated advocate data.
 * @param request - The incoming HTTP request
 * @returns A promise that resolves to a NextResponse containing advocate data or an error message
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const pageParam: string | null = url.searchParams.get("page");
    const limitParam: string | null = url.searchParams.get("limit");
    const page: number = parseInt(pageParam || "1", 10);
    const limit: number = parseInt(limitParam || "10", 10);

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return NextResponse.json(
        { error: "Invalid page or limit parameter" },
        { status: 400 }
      );
    }

    const offset: number = (page - 1) * limit;
    const advocatesData: Advocate[] = await db
      .select()
      .from(advocates)
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ data: advocatesData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
