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

export interface AdvocateServerResponse {
  data: Advocate[];
  page: number;
  limit: number;
}

export interface ErrorResponseBody {
  error: string;
  message?: string;
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
    const pageParam: string | null = url.searchParams.get("page");
    const limitParam: string | null = url.searchParams.get("limit");

    const page = pageParam ? parseInt(pageParam) : 1;
    const limit = limitParam ? parseInt(limitParam) : 9;

    if (isNaN(page) || page < 1) {
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

    const offset = (page - 1) * limit;
    const advocatesDbResponse = await db
      .select()
      .from(advocates)
      .limit(limit)
      .offset(offset);

    if (advocatesDbResponse.length === 0) {
      return NextResponse.json<ErrorResponseBody>(
        { error: "No advocates found" },
        { status: 404 }
      );
    }

    const data: Advocate[] = advocatesDbResponse.map((record) => {
      return {
        ...record,
        specialties: Array.isArray(record.specialties)
          ? record.specialties
          : [],
      };
    });

    return NextResponse.json<AdvocateServerResponse>(
      { data, page, limit },
      { status: 200 }
    );
  } catch (error: unknown) {
    /** handle if error is not guaranteed to have message property, edge case */
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    /** send this error message to some sort of monitoring (AWS Cloudwatch, sentry, etc.) */
    return NextResponse.json<ErrorResponseBody>(
      {
        error: "The API suffered a server-side error, please contact support",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
