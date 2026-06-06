import React, { useState } from "react";
import { useCreateContact } from "../hooks/useCreateContact";
import { contactCreateSchema, type ContactCreateInput } from "@/domain/contact/contact.schema";
import { Input, Textarea, Select, FormItem, Button, Card, Typography } from "@/shared/ui";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { contactFormContent } from "@/app/data/contactForm";

export function ContactForm() {
  const { submit, loading, error, success } = useCreateContact();
  const [formValues, setFormValues] = useState<ContactCreateInput>({
    name: "",
    email: "",
    phone: "",
    serviceType: "standard",
    budget: "",
    message: "",
    website: ""
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
        <CheckCircle2 size={48} className="text-violet mb-4 animate-bounce" />
        <Typography as="h3" variant="subheading" className="text-2xl font-bold mb-2">{contactFormContent.successTitle}</Typography>
        <Typography variant="body" color="ghost" className="opacity-70 max-w-md">
          {contactFormContent.successDesc}
        </Typography>
      </Card>
    );
  }

  return (
    <Card variant="frost" className="p-6 md:p-8 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Honeypot field - completely hidden from human users */}
        <input
          type="text"
          name="website"
          value={formValues.website || ""}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          style={{ display: "none" }}
          aria-hidden="true"
        />

        <div className="grid md:grid-cols-2 gap-5">
          <FormItem label={contactFormContent.labelName} error={fieldErrors.name}>
            <Input
              name="name"
              placeholder={contactFormContent.placeholderName}
              value={formValues.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </FormItem>

          <FormItem label={contactFormContent.labelEmail} error={fieldErrors.email}>
            <Input
              name="email"
              type="email"
              placeholder={contactFormContent.placeholderEmail}
              value={formValues.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </FormItem>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <FormItem label={contactFormContent.labelPhone} error={fieldErrors.phone}>
            <Input
              name="phone"
              placeholder={contactFormContent.placeholderPhone}
              value={formValues.phone || ""}
              onChange={handleChange}
              disabled={loading}
            />
          </FormItem>

          <FormItem label={contactFormContent.labelServiceType} error={fieldErrors.serviceType}>
            <Select
              name="serviceType"
              aria-label={contactFormContent.labelServiceType}
              value={formValues.serviceType}
              onChange={handleChange}
              disabled={loading}
            >
              {contactFormContent.serviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-midnight">
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormItem>
        </div>

        <FormItem label={contactFormContent.labelBudget} error={fieldErrors.budget}>
          <Input
            name="budget"
            placeholder={contactFormContent.placeholderBudget}
            value={formValues.budget || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </FormItem>

        <FormItem label={contactFormContent.labelMessage} error={fieldErrors.message}>
          <Textarea
            name="message"
            placeholder={contactFormContent.placeholderMessage}
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
          {contactFormContent.btnSubmit}
        </Button>
      </form>
    </Card>
  );
}
