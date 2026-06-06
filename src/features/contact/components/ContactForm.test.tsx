import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";
import { useCreateContact } from "../hooks/useCreateContact";

// Mock the hook to isolate component tests from API calls
vi.mock("../hooks/useCreateContact", () => ({
  useCreateContact: vi.fn(),
}));

describe("ContactForm Component", () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form input fields correctly", () => {
    vi.mocked(useCreateContact).mockReturnValue({
      submit: mockSubmit,
      loading: false,
      error: null,
      success: false,
    });

    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Nguyen Tam Duc")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("contact@tamduc.dev")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+84 905...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. 5tr - 10tr")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/describe your project/i)).toBeInTheDocument();
    expect(screen.getByText("Service Type")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send request/i })).toBeInTheDocument();
  });

  it("shows frontend validation error for invalid email", async () => {
    vi.mocked(useCreateContact).mockReturnValue({
      submit: mockSubmit,
      loading: false,
      error: null,
      success: false,
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill in values
    await user.type(screen.getByPlaceholderText("Nguyen Tam Duc"), "Nguyen Tam Duc");
    await user.type(screen.getByPlaceholderText("contact@tamduc.dev"), "invalid-email");
    await user.type(screen.getByPlaceholderText(/describe your project/i), "This is a valid long message request.");

    await user.click(screen.getByRole("button", { name: /send request/i }));

    // Validation should prevent submission and display Zod schema error message
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("shows frontend validation error for short message", async () => {
    vi.mocked(useCreateContact).mockReturnValue({
      submit: mockSubmit,
      loading: false,
      error: null,
      success: false,
    });

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByPlaceholderText("Nguyen Tam Duc"), "Nguyen Tam Duc");
    await user.type(screen.getByPlaceholderText("contact@tamduc.dev"), "contact@tamduc.dev");
    await user.type(screen.getByPlaceholderText(/describe your project/i), "Short"); // Under 10 characters

    await user.click(screen.getByRole("button", { name: /send request/i }));

    expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("submits the form successfully and displays thank you message", async () => {
    vi.mocked(useCreateContact).mockReturnValue({
      submit: mockSubmit,
      loading: false,
      error: null,
      success: false,
    });

    const user = userEvent.setup();
    const { rerender } = render(<ContactForm />);

    // Fill in correct details
    await user.type(screen.getByPlaceholderText("Nguyen Tam Duc"), "Nguyen Tam Duc");
    await user.type(screen.getByPlaceholderText("contact@tamduc.dev"), "contact@tamduc.dev");
    await user.type(screen.getByPlaceholderText(/describe your project/i), "I want to build a Three.js portfolio website.");

    // Mock hook return on next render when success = true
    vi.mocked(useCreateContact).mockReturnValue({
      submit: mockSubmit,
      loading: false,
      error: null,
      success: true,
    });

    await user.click(screen.getByRole("button", { name: /send request/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Nguyen Tam Duc",
      email: "contact@tamduc.dev",
      phone: "",
      serviceType: "standard",
      budget: "",
      message: "I want to build a Three.js portfolio website.",
      website: "",
    });

    rerender(<ContactForm />);

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      expect(screen.getByText(/your request was received successfully/i)).toBeInTheDocument();
    });
  });

  it("displays server error message when API request fails", async () => {
    vi.mocked(useCreateContact).mockReturnValue({
      submit: mockSubmit,
      loading: false,
      error: "SMTP connection timeout. Please try again.",
      success: false,
    });

    render(<ContactForm />);

    expect(screen.getByText(/smtp connection timeout/i)).toBeInTheDocument();
  });
});
