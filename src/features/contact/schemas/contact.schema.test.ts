import { describe, it, expect } from "vitest";
import { contactCreateSchema } from "@/domain/contact/contact.schema";

describe("contactCreateSchema", () => {
  it("accepts valid contact input", () => {
    const result = contactCreateSchema.safeParse({
      name: "Tam Duc",
      email: "contact@tamduc.dev",
      serviceType: "standard",
      message: "I need a beautiful high-fidelity custom website."
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const result = contactCreateSchema.safeParse({
      name: "Tam Duc",
      email: "invalid-email",
      serviceType: "standard",
      message: "I need a beautiful high-fidelity custom website."
    });
    expect(result.success).toBe(false);
  });

  it("rejects message under 10 characters", () => {
    const result = contactCreateSchema.safeParse({
      name: "Tam Duc",
      email: "contact@tamduc.dev",
      serviceType: "standard",
      message: "Short"
    });
    expect(result.success).toBe(false);
  });
});
