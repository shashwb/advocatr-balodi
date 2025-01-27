import { GET, AdvocateServerResponse, ErrorResponseBody } from "./route"; // GET handlers
import db from "../../../db"; // db module
import { PgSelectBase } from "drizzle-orm/pg-core"; // import types from drizzle-orm
import { NextResponse } from "next/server"; // import NextResponse from next/server

/** goals:
 * -> ensure features work (pagination)
 * -> handle errors
 * -> validate responses
 */

/** MAIN MOCK OBJECT */
jest.mock("../../../db", () => ({
  select: jest.fn(() => {
    return {
      from: jest.fn(() => {
        return {
          limit: jest.fn(() => {
            return {
              offset: jest.fn().mockResolvedValueOnce([
                {
                  id: 1,
                  firstName: "John",
                  lastName: "Doe",
                  city: "New York",
                  degree: "MD",
                  specialties: ["Cardiology"],
                  yearsOfExperience: 10,
                  phoneNumber: "1234567890",
                  createdAt: new Date(),
                },
              ]),
            };
          }),
        };
      }),
    };
  }),
}));

describe("GET /api/advocates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** SUCCESS */
  test("returns paginated advocates", async () => {
    const request: Request = new Request(
      "http://localhost/api/advocates?page=1&limit=5"
    );

    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(200);
    expect(jsonResponse.data).toHaveLength(1);
    expect(jsonResponse.data[0].firstName).toBe("John");
  });

  /** FAILURE */
  test("handles invalid 'page' request param (> 0) for pagination", async () => {
    const request: Request = new Request(
      "http://localhost/api/advocates?page=0"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    // code 400: incorrect syntax or invalid data
    expect(response.status).toBe(400);
    expect(jsonResponse.error).toBe(
      "Invalid page parameter: page must be a positive integer"
    );
  });

  test("handles invalid limit (< 50) for pagination", async () => {
    const request: Request = new Request(
      "http://localhost/api/advocates?limit=51"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    // code 400: incorrect syntax or invalid data
    expect(response.status).toBe(400);
    expect(jsonResponse.error).toBe(
      "Invalid limit parameter: limit must be a positive integer between 1 and 50"
    );
  });

  test("returns 404 when no advocates are found", async () => {
    /** we need to mock the entire db call that we expect.... */

    (db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockReturnValueOnce({
          offset: jest.fn().mockResolvedValueOnce([]), // return an empty array here
        }),
      }),
    });

    const request = new Request(
      "http://localhost/api/advocates?page=1&limit=10"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(404);
    expect(jsonResponse.error).toBe("No advocates found");
  });

  /** INTERNAL SERVER ERROR */
  test("handles internal server errors", async () => {
    /** mock a db error */
    (db.select as jest.Mock).mockReturnValueOnce({
      from: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockReturnValueOnce({
          offset: jest.fn().mockResolvedValueOnce(new Error("database error!")), // return an empty array here
        }),
      }),
    });

    const request = new Request(
      "http://localhost/api/advocates?page=1&limit=10"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(500);
    expect(jsonResponse.error).toBe("Internal Server Error");
  });
});
