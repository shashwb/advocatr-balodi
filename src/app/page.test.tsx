import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { act } from "react";

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({
      data: [{ id: 1, firstName: "John", lastName: "Doe" }],
    }),
  })
) as jest.Mock;

describe("Home component", () => {
  it("fetches and displays advocates (promise result)", async () => {
    const mockAdvocate = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      city: "New York",
      degree: "MD",
      specialties: ["Cardiology"],
      yearsOfExperience: 10,
      phoneNumber: "1234567890",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({ data: [mockAdvocate] }),
      })
    ) as jest.Mock;

    let component: ReturnType<typeof render> | undefined;
    await act(async () => {
      component = render(<Home />);
    });

    if (!component) {
      throw new Error("Component was not rendered correctly");
    }

    expect(component.getByText("John Doe")).toBeInTheDocument();
    expect(component.getByText("New York")).toBeInTheDocument();
    expect(component.getByText("MD")).toBeInTheDocument();
  });

  it("initial useEffect hydration of advocates", async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("New York")).toBeInTheDocument();
      expect(screen.getByText("MD")).toBeInTheDocument();
    });
  });

  it("updates search term state when search input field changes", async () => {
    await act(async () => {
      render(<Home />);
    });

    const searchInput = screen.getByPlaceholderText(
      "Search by name, city, or specialty..."
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "john" } });
    });

    expect(searchInput.value).toBe("john");
  });

  it("sets error state when API request fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByText(/API Error/)).toBeInTheDocument();
    });
  });
});
