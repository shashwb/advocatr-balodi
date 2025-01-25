import db from "../../../db";
import { advocates, Advocate } from "../../../db/schema";
import { NextResponse } from "next/server";

/**
 * IMPROVEMENTS:
 * + add typescript types
 * + replaced mocks with db query
 * + add error handling and request/query result validation
 * + add pagination
 */

interface AdvocateServerResponse {
  data: Advocate[];
  pageNumber: number;
  limit: number;
}

interface ErrorResponseBody {
  error: string;
}

/**
 * Handles GET requests to fetch paginated advocate data.
 * @param request - The incoming HTTP request
 * @returns A promise that resolves to a NextResponse containing advocate data or an error message
 */
export async function GET(
  request: Request
): Promise<
  NextResponse<AdvocateServerResponse> | NextResponse<{ error: string }>
> {
  const MAX_LIMIT = 50;
  try {
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");
    const limitParam = url.searchParams.get("limit");
    const pageNumber = parseInt(pageParam || "1", 10);
    const limit = parseInt(limitParam || "10", 10);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return NextResponse.json<ErrorResponseBody>(
        { error: "Invalid page parameter: page must be a positive integer" },
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit <= 0 || limit > MAX_LIMIT) {
      return NextResponse.json<ErrorResponseBody>(
        {
          error:
            "Invalid limit parameter: limit must be a positive integer between 1 and 50",
        },
        { status: 400 }
      );
    }

    const offset = (pageNumber - 1) * limit;
    const data: Advocate[] = await db
      .select()
      .from(advocates)
      .limit(limit)
      .offset(offset);

    if (!data || data.length === 0) {
      return NextResponse.json<ErrorResponseBody>(
        { error: "No advocates found" },
        { status: 404 }
      );
    }

    return NextResponse.json<AdvocateServerResponse>(
      { data, pageNumber, limit },
      { status: 200 }
    );
  } catch (error: unknown) {
    /** handle if error is not guaranteed to have message property, edge case */
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json<ErrorResponseBody>(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
