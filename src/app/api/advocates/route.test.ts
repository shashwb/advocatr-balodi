import { GET } from "./route"; // GET handler for /api/advocates
import db from "../../../db"; // Mock database

jest.mock("../../../db", () => ({
  select: jest.fn(),
}));

const mockDbResponse = (returnValue: any, shouldError: boolean = false) => {
  const mockChain = {
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: shouldError
      ? jest.fn().mockRejectedValue(new Error("Database error"))
      : jest.fn().mockResolvedValue(returnValue),
  };

  (db.select as jest.Mock).mockReturnValue(mockChain);
};

describe("/api/advocates GET", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns paginated advocates filtered by specialties", async () => {
    mockDbResponse([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        city: "New York",
        degree: "MD",
        specialties: ["Cardiology", "Neurology"],
        yearsOfExperience: 10,
        phoneNumber: "1234567890",
      },
    ]);

    const request = new Request(
      "http://localhost/api/advocates?search=Cardiology&page=1&limit=5"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(200);
    expect(jsonResponse.data).toHaveLength(1);
    expect(jsonResponse.data[0].specialties).toContain("Cardiology");
  });

  test("handles invalid pagination parameters", async () => {
    const request = new Request(
      "http://localhost/api/advocates?page=-1&limit=101"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(400);
    expect(jsonResponse.error).toBe(
      "Invalid page parameter: page must be a positive integer"
    );
  });

  test("returns 404 when no advocates match search term", async () => {
    mockDbResponse([]);
    const request = new Request(
      "http://localhost/api/advocates?search=Nonexistent&page=1&limit=5"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(404);
    expect(jsonResponse.error).toBe("No advocates found");
  });

  test("handles internal server errors gracefully", async () => {
    mockDbResponse(null, true);

    const request = new Request(
      "http://localhost/api/advocates?page=1&limit=5"
    );
    const response = await GET(request);
    const jsonResponse = await response.json();

    expect(response.status).toBe(500);
    expect(jsonResponse.error).toBe(
      "The API suffered a server-side error, please contact support"
    );
  });
});
