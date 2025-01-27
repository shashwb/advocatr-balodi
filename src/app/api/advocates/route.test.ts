import { GET } from "./route"; // GET handlers
import db from "../../../db"; // db module
import { NextResponse } from "next/server"; // import NextResponse from next/server

/** goals:
 * -> ensure features work (pagination)
 * -> handle errors
 * -> validate responses
 */

jest.mock("../../../db", () => ({
  select: jest.fn(),
}));

const mockDbResponse = (returnValue: any, shouldError: boolean = false) => {
  const mockChain = {
    from: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: shouldError
      ? jest.fn().mockRejectedValue(new Error("Database error"))
      : jest.fn().mockResolvedValue(returnValue),
  };

  (db.select as jest.Mock).mockReturnValue(mockChain);
};

describe("GET /api/advocates", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** SUCCESS */
  test("returns paginated advocates", async () => {
    mockDbResponse([
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
    ]);

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
    mockDbResponse([
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
    ]);
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
    mockDbResponse([
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
    ]);
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
    mockDbResponse([]);
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
    mockDbResponse(null, true);

    const request = new Request(
      "http://localhost/api/advocates?page=1&limit=10"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(500);
    expect(jsonResponse.error).toBe(
      "The API suffered a server-side error, please contact support"
    );
  });
});
