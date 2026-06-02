import React, { useState } from "react";
import { useCreateContact } from "../hooks/useCreateContact";
import { contactCreateSchema, type ContactCreateInput } from "../schemas/contact.schema";
import { Input, Textarea, Select, FormItem, Button, Card } from "@/shared/ui";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const { submit, loading, error, success } = useCreateContact();
  const [formValues, setFormValues] = useState<ContactCreateInput>({
    name: "",
    email: "",
    phone: "",
    serviceType: "standard",
    budget: "",
    message: ""
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactCreateInput, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (fieldErrors[name as keyof ContactCreateInput]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const result = contactCreateSchema.safeParse(formValues);
    if (!result.success) {
      const errors: Partial<Record<keyof ContactCreateInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactCreateInput;
        errors[path] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    try {
      await submit(result.data);
    } catch {
      // Error handled by hook
    }
  };

  if (success) {
    return (
      <Card variant="cosmic" className="p-8 text-center max-w-xl mx-auto flex flex-col items-center justify-center min-h-[300px]">
        <CheckCircle2 size={48} className="text-[#af50ff] mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
        <p className="text-[#f0f0f0]/70 max-w-md">
          Your request was received successfully. I will review it and reply as soon as possible.
        </p>
      </Card>
    );
  }

  return (
    <Card variant="frost" className="p-6 md:p-8 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <FormItem label="Name" error={fieldErrors.name}>
            <Input
              name="name"
              placeholder="Nguyen Tam Duc"
              value={formValues.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </FormItem>

          <FormItem label="Email" error={fieldErrors.email}>
            <Input
              name="email"
              type="email"
              placeholder="contact@tamduc.dev"
              value={formValues.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </FormItem>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <FormItem label="Phone (Optional)" error={fieldErrors.phone}>
            <Input
              name="phone"
              placeholder="+84 905..."
              value={formValues.phone || ""}
              onChange={handleChange}
              disabled={loading}
            />
          </FormItem>

          <FormItem label="Service Type" error={fieldErrors.serviceType}>
            <Select
              name="serviceType"
              value={formValues.serviceType}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="basic" className="bg-[#090909]">Basic Template</option>
              <option value="standard" className="bg-[#090909]">Standard Custom</option>
              <option value="premium" className="bg-[#090909]">Premium System</option>
              <option value="custom" className="bg-[#090909]">Custom Work</option>
            </Select>
          </FormItem>
        </div>

        <FormItem label="Estimated Budget (Optional)" error={fieldErrors.budget}>
          <Input
            name="budget"
            placeholder="e.g. 5tr - 10tr"
            value={formValues.budget || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </FormItem>

        <FormItem label="Message" error={fieldErrors.message}>
          <Textarea
            name="message"
            placeholder="Describe your project, timeline, or thoughts here..."
            value={formValues.message}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </FormItem>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm p-3 rounded bg-red-500/10 border border-red-500/20">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-4">
          Send Request
        </Button>
      </form>
    </Card>
  );
}
