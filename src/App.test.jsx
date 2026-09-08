import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import App from "./App";

const mockProducts = [
  {
    id: 1,
    title: "Test Product",
    price: 100,
    image: "test-image.jpg",
  },
  {
    id: 2,
    title: "Another Product",
    price: 50,
    image: "another-image.jpg",
  },
];

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
}

describe("Shopping Cart", () => {
  test("renders navigation", () => {
    renderApp();

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Cart/ })).toBeInTheDocument();
  });

  test("renders home page", () => {
    renderApp();

    expect(
      screen.getByRole("heading", {
        name: /simple shopping, built with react/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /start shopping/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders empty cart", () => {
    renderApp(["/cart"]);

    expect(
      screen.getByRole("heading", {
        name: /your cart is empty/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /browse products/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders products from API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderApp(["/shop"]);

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Test Product",
        }),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("heading", {
        name: "Another Product",
      }),
    ).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  test("adds product to cart", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderApp(["/shop"]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Test Product",
        }),
      ).toBeInTheDocument();
    });

    const addButtons = screen.getAllByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addButtons[0]);

    expect(
      screen.getByRole("link", {
        name: /cart 1/i,
      }),
    ).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  test("adds multiple quantities of a product to cart", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderApp(["/shop"]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Test Product",
        }),
      ).toBeInTheDocument();
    });

    const quantityInputs = screen.getAllByRole("spinbutton");

    await user.clear(quantityInputs[0]);
    await user.type(quantityInputs[0], "3");

    const addButtons = screen.getAllByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addButtons[0]);

    expect(
      screen.getByRole("link", {
        name: /cart 3/i,
      }),
    ).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  test("increases quantity in cart", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderApp(["/shop"]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Test Product",
        }),
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getAllByRole("button", {
        name: /add to cart/i,
      })[0],
    );

    await user.click(
      screen.getByRole("link", {
        name: /cart 1/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /shopping cart/i,
      }),
    ).toBeInTheDocument();

    const increaseButtons = screen.getAllByRole("button", {
      name: "+",
    });

    await user.click(increaseButtons[0]);

    expect(
      screen.getByRole("link", {
        name: /cart 2/i,
      }),
    ).toBeInTheDocument();
  });

  test("decreases quantity in cart", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderApp(["/shop"]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Test Product",
        }),
      ).toBeInTheDocument();
    });

    const quantityInputs = screen.getAllByRole("spinbutton");

    await user.clear(quantityInputs[0]);
    await user.type(quantityInputs[0], "2");

    await user.click(
      screen.getAllByRole("button", {
        name: /add to cart/i,
      })[0],
    );

    await user.click(
      screen.getByRole("link", {
        name: /cart 2/i,
      }),
    );

    const decreaseButtons = screen.getAllByRole("button", {
      name: "−",
    });

    await user.click(decreaseButtons[0]);

    expect(
      screen.getByRole("link", {
        name: /cart 1/i,
      }),
    ).toBeInTheDocument();
  });

  test("removes product from cart", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderApp(["/shop"]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Test Product",
        }),
      ).toBeInTheDocument();
    });

    await user.click(
      screen.getAllByRole("button", {
        name: /add to cart/i,
      })[0],
    );

    await user.click(
      screen.getByRole("link", {
        name: /cart 1/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /remove/i,
      }),
    );

    expect(
      screen.getByRole("heading", {
        name: /your cart is empty/i,
      }),
    ).toBeInTheDocument();
  });

  test("calculates cart total correctly", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );

    renderApp(["/shop"]);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Test Product",
        }),
      ).toBeInTheDocument();
    });

    const quantityInputs = screen.getAllByRole("spinbutton");

    await user.clear(quantityInputs[0]);
    await user.type(quantityInputs[0], "3");

    await user.click(
      screen.getAllByRole("button", {
        name: /add to cart/i,
      })[0],
    );

    await user.click(
      screen.getByRole("link", {
        name: /cart 3/i,
      }),
    );

    expect(screen.getByText("Total")).toBeInTheDocument();

    expect(screen.getByText("$300.00")).toBeInTheDocument();
  });

  test("shows error when API request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error"))),
    );

    renderApp(["/shop"]);

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });

    vi.unstubAllGlobals();
  });
});
