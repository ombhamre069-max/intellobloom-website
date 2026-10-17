"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { isValidEmail } from "@/lib/utils";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error" | "not-configured";

const interestOptions = [
  "Intellobloom",
  "IntelliSTEM",
  "AgniKawach",
  "Partnership",
  "Other",
] as const;

type FieldErrors = Partial<
  Record<"fullName" | "email" | "organization" | "industry" | "interest" | "message", string>
>;

export function ContactForm({
  className,
  defaultInterest = "",
}: {
  className?: string;
  defaultInterest?: string;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("fullName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const organization = String(fd.get("organization") ?? "").trim();
    const industry = String(fd.get("industry") ?? "").trim();
    const interest = String(fd.get("interest") ?? "");
    const message = String(fd.get("message") ?? "").trim();
    const website = String(fd.get("website") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!fullName) nextErrors.fullName = "Full name is required.";
    if (!email) nextErrors.email = "Work email is required.";
    else if (!isValidEmail(email)) nextErrors.email = "Enter a valid email address.";
    if (!organization) nextErrors.organization = "Organization is required.";
    if (!industry) nextErrors.industry = "Industry is required.";
    if (!interest) nextErrors.interest = "Select an area of interest.";
    if (!message || message.length < 20)
      nextErrors.message = "Please provide a message (at least 20 characters).";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (website) {
      return;
    }

    setState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          organization,
          industry,
          interest,
          message,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string; configured?: boolean };

      if (res.status === 503 || data.configured === false) {
        setState("not-configured");
        setFormError(
          data.error ??
            "Contact delivery is not configured yet. Email us directly once your contact address is published, or configure the backend (see README).",
        );
        return;
      }

      if (!res.ok) {
        setState("error");
        setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setState("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setState("error");
      setFormError("Network error. Please check your connection and try again.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-midnight shadow-sm transition-colors focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/20";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8",
        className,
      )}
      noValidate
    >
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" error={errors.fullName} required>
          <input id="fullName" name="fullName" type="text" autoComplete="name" className={inputClass} />
        </Field>
        <Field label="Work email" htmlFor="email" error={errors.email} required>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} />
        </Field>
        <Field label="Organization" htmlFor="organization" error={errors.organization} required>
          <input id="organization" name="organization" type="text" autoComplete="organization" className={inputClass} />
        </Field>
        <Field label="Industry" htmlFor="industry" error={errors.industry} required>
          <input id="industry" name="industry" type="text" className={inputClass} />
        </Field>
      </div>

      <Field
        label="Area of interest"
        htmlFor="interest"
        error={errors.interest}
        required
        className="mt-5"
      >
        <select
          id="interest"
          name="interest"
          defaultValue={defaultInterest || ""}
          className={inputClass}
        >
          <option value="" disabled>
            Select…
          </option>
          {interestOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message} required className="mt-5">
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(inputClass, "resize-y min-h-[120px]")}
        />
      </Field>

      {formError && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {formError}
        </p>
      )}

      {state === "success" && (
        <p className="mt-4 text-sm text-emerald-700" role="status">
          Thank you — your enquiry was submitted successfully.
        </p>
      )}

      <Button
        type="submit"
        className="mt-6 w-full sm:w-auto"
        disabled={state === "loading"}
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Submit enquiry"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-midnight">
        {label}
        {required && <span className="text-agni"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
