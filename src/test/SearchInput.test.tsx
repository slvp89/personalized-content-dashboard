import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SearchInput } from "@/components/common/SearchInput";
import contentReducer from "@/store/slices/contentSlice";
import preferencesReducer from "@/store/slices/preferencesSlice";

const createMockStore = () =>
  configureStore({
    reducer: {
      content: contentReducer,
      preferences: preferencesReducer,
    },
  });

describe("SearchInput Component", () => {
  it("renders search input correctly with placeholder and shortcut", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder");
  });

  it("updates search input value and debounces query to Redux store", async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Quantum" } });
    expect(input.value).toBe("Quantum");

    // Wait for debounced state update (350ms)
    await waitFor(
      () => {
        expect(store.getState().content.searchQuery).toBe("Quantum");
      },
      { timeout: 800 }
    );
  });

  it("clears search query when clear button is clicked", async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "AI Agents" } });

    await waitFor(
      () => {
        expect(store.getState().content.searchQuery).toBe("AI Agents");
      },
      { timeout: 800 }
    );

    const clearBtn = screen.getByTitle("Clear search");
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);

    expect(input.value).toBe("");
    expect(store.getState().content.searchQuery).toBe("");
  });
});
