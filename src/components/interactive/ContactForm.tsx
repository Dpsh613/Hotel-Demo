"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ContactFormField } from "@/types";
import { cn } from "@/lib/utils";

export interface ContactFormProps {
  formConfig: {
    fields: ContactFormField[];
    submit_label: string;
    consent_text: string;
    success_heading: string;
    success_body: string;
    error_message: string;
  };
  privacyPolicyUrl: string;
}

export function ContactForm({
  formConfig,
  privacyPolicyUrl,
}: ContactFormProps) {
  const [textFields, setTextFields] = useState<Record<string, string>>({});
  const [radioValues, setRadioValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [globalErrorMsg, setGlobalErrorMsg] = useState("");

  // NEW: Real-time validation state
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (status === "success" && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [status]);

  // Helper function to validate a single field
  const validateField = (field: ContactFormField, value: string) => {
    if (field.required && !value.trim()) return `This field is required.`;
    if (field.type === "email" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address.";
    }
    return "";
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTextFields((prev) => ({ ...prev, [name]: value }));

    // Instantly clear or update the error as they type, if they've already touched the field
    if (touched[name]) {
      const field = formConfig.fields.find((f) => f.name === name);
      if (field) {
        setFieldErrors((prev) => ({
          ...prev,
          [name]: validateField(field, value),
        }));
      }
    }
  };

  // Triggered when a user clicks OUT of a field
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const field = formConfig.fields.find((f) => f.name === name);
    if (field) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: validateField(field, value),
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0] || null);
      setFieldErrors((prev) => ({ ...prev, file_input: "" })); // Clear error
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Run full validation on ALL fields before submitting
    let isValid = true;
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    formConfig.fields.forEach((field) => {
      if (["text", "email", "tel", "textarea"].includes(field.type)) {
        const val = textFields[field.name] || "";
        const err = validateField(field, val);
        if (err) {
          isValid = false;
          newErrors[field.name] = err;
        }
        newTouched[field.name] = true;
      }
      if (
        field.type === "radio" &&
        field.required &&
        !radioValues[field.name]
      ) {
        isValid = false;
        newErrors[field.name] = "Please select an option.";
        newTouched[field.name] = true;
      }
      if (field.type === "file" && field.required && !file) {
        isValid = false;
        newErrors[field.name] = "A file is required.";
        newTouched[field.name] = true;
      }
    });

    if (
      formConfig.fields.some((f) => f.name === "consent" && f.required) &&
      !consent
    ) {
      isValid = false;
      newErrors["consent"] = "You must agree to the privacy policy.";
      newTouched["consent"] = true;
    }

    if (!isValid) {
      setFieldErrors(newErrors);
      setTouched(newTouched);
      setStatus("error");
      setGlobalErrorMsg("Please fix the highlighted fields above.");
      return;
    }

    // 2. If valid, proceed with submission
    setStatus("loading");
    setGlobalErrorMsg("");

    const formData = new FormData();
    Object.entries(textFields).forEach(([key, value]) =>
      formData.append(key, value),
    );
    Object.entries(radioValues).forEach(([key, value]) =>
      formData.append(key, value),
    );
    formData.append("consent", consent ? "true" : "false");

    const fileField = formConfig.fields.find((f) => f.type === "file");
    if (file && fileField) {
      formData.append(fileField.name, file);
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        if (data.errors && data.errors.length > 0) {
          setGlobalErrorMsg(data.errors.join(" | "));
        } else {
          setGlobalErrorMsg(data.message || formConfig.error_message);
        }
      }
    } catch (err) {
      setStatus("error");
      setGlobalErrorMsg(formConfig.error_message);
    }
  };

  if (status === "success") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
          className="p-8 bg-surface-alternate rounded-base border border-border-subtle text-center"
        >
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="text-section-h2 text-text-primary mb-4 outline-none font-display font-semibold"
          >
            {formConfig.success_heading}
          </h3>
          <p className="text-body-large text-text-secondary">
            {formConfig.success_body}
          </p>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {status === "error" && globalErrorMsg && (
        <div
          role="alert"
          className="p-4 bg-destructive/10 text-destructive rounded-base border border-destructive/20 text-sm"
        >
          {globalErrorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {formConfig.fields.map((field) => {
          const isHalfWidth =
            field.name === "first_name" || field.name === "last_name";
          const gridClass = isHalfWidth
            ? "col-span-1"
            : "col-span-1 md:col-span-2";
          const hasError = touched[field.name] && fieldErrors[field.name];

          if (
            field.type === "text" ||
            field.type === "email" ||
            field.type === "tel"
          ) {
            return (
              <div key={field.name} className={gridClass}>
                <Label htmlFor={field.name} className="sr-only">
                  {field.label} {field.required && "*"}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={(field.placeholder || field.label).toUpperCase()}
                  required={field.required}
                  maxLength={field.max_length || 100}
                  aria-required={field.required ? "true" : undefined}
                  aria-invalid={hasError ? "true" : "false"}
                  value={textFields[field.name] || ""}
                  onChange={handleTextChange}
                  onBlur={handleBlur} // NEW: Trigger validation when user leaves field
                  className={cn(
                    "bg-transparent h-[52px] text-xs uppercase tracking-wider text-text-primary transition-colors focus-visible:ring-text-primary focus-visible:border-text-primary placeholder:text-text-primary",
                    hasError
                      ? "border-destructive text-destructive focus-visible:ring-destructive focus-visible:border-destructive placeholder:text-destructive/50"
                      : "border-border-subtle hover:border-text-primary",
                  )}
                />
                {hasError && (
                  <p className="text-[10px] text-destructive uppercase tracking-wider mt-1.5 pl-2">
                    {fieldErrors[field.name]}
                  </p>
                )}
              </div>
            );
          }

          if (field.type === "textarea") {
            const currentLength = (textFields[field.name] || "").length;
            const maxLength = field.max_length || 2000;

            return (
              <div key={field.name} className={gridClass}>
                <Label htmlFor={field.name} className="sr-only">
                  {field.label} {field.required && "*"}
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder={(field.placeholder || field.label).toUpperCase()}
                  required={field.required}
                  maxLength={maxLength}
                  aria-required={field.required ? "true" : undefined}
                  aria-invalid={hasError ? "true" : "false"}
                  value={textFields[field.name] || ""}
                  onChange={handleTextChange}
                  onBlur={handleBlur} // NEW: Trigger validation
                  className={cn(
                    "bg-transparent min-h-[120px] text-xs uppercase tracking-wider text-text-primary transition-colors focus-visible:ring-text-primary focus-visible:border-text-primary placeholder:text-text-primary",
                    hasError
                      ? "border-destructive text-destructive focus-visible:ring-destructive focus-visible:border-destructive placeholder:text-destructive/50"
                      : "border-border-subtle hover:border-text-primary",
                  )}
                />
                <div className="flex justify-between items-start mt-1.5 px-2">
                  <div className="flex-1">
                    {hasError && (
                      <p className="text-[10px] text-destructive uppercase tracking-wider">
                        {fieldErrors[field.name]}
                      </p>
                    )}
                  </div>
                  {/* NEW: Character Counter */}
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-wider tabular-nums",
                      currentLength >= maxLength
                        ? "text-destructive font-bold"
                        : "text-text-secondary",
                    )}
                  >
                    {currentLength} / {maxLength}
                  </span>
                </div>
              </div>
            );
          }

          if (field.type === "radio") {
            return (
              <fieldset
                key={field.name}
                className={cn("space-y-3 mt-4", gridClass)}
              >
                <legend className="text-[11px] font-bold text-text-primary uppercase tracking-widest mb-3">
                  {field.label}{" "}
                  {field.required && (
                    <span className="text-brand-secondary">*</span>
                  )}
                </legend>
                <RadioGroup
                  value={radioValues[field.name]}
                  onValueChange={(val) => {
                    setRadioValues((prev) => ({ ...prev, [field.name]: val }));
                    if (touched[field.name])
                      setFieldErrors((prev) => ({ ...prev, [field.name]: "" }));
                  }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {field.options?.map((opt) => (
                    <div key={opt.value} className="flex-1 relative">
                      <RadioGroupItem
                        value={opt.value}
                        id={`${field.name}-${opt.value}`}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`${field.name}-${opt.value}`}
                        className={cn(
                          "w-full h-[52px] flex items-center px-6 cursor-pointer text-xs uppercase tracking-wider transition-colors border rounded-md",
                          radioValues[field.name] === opt.value
                            ? "bg-text-primary text-text-on-dark border-text-primary font-medium"
                            : "bg-transparent text-text-primary border-border-subtle hover:border-text-primary font-normal",
                          hasError &&
                            !radioValues[field.name] &&
                            "border-destructive text-destructive",
                        )}
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {hasError && (
                  <p className="text-[10px] text-destructive uppercase tracking-wider mt-1.5 pl-2">
                    {fieldErrors[field.name]}
                  </p>
                )}
              </fieldset>
            );
          }

          if (field.type === "file") {
            return (
              <div key={field.name} className={cn("space-y-3 mt-4", gridClass)}>
                <Label className="text-[11px] font-bold text-text-primary uppercase tracking-widest block">
                  {field.label}{" "}
                  {field.required && (
                    <span className="text-brand-secondary">*</span>
                  )}
                </Label>
                <div className="flex flex-col items-start gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "h-10 px-6 rounded-full border text-xs uppercase tracking-wider bg-transparent transition-colors",
                      hasError && !file
                        ? "border-destructive text-destructive hover:border-destructive"
                        : "border-border-subtle text-text-primary hover:border-text-primary",
                    )}
                  >
                    Choose File <span className="ml-1">↑</span>
                  </Button>
                  <span className="text-[11px] text-text-secondary/60 uppercase tracking-wider truncate max-w-full pl-2">
                    {file ? file.name : "No file chosen"}
                  </span>
                  <input
                    id={`${field.name}-input`}
                    ref={fileInputRef}
                    type="file"
                    name={field.name}
                    accept="image/jpeg, image/png, application/pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </div>
                {hasError && (
                  <p className="text-[10px] text-destructive uppercase tracking-wider mt-1.5 pl-2">
                    {fieldErrors[field.name]}
                  </p>
                )}
              </div>
            );
          }

          if (field.type === "checkbox" && field.name === "consent") {
            return (
              <div
                key={field.name}
                className="col-span-1 md:col-span-2 pt-8 mt-4 border-2"
              >
                <Checkbox
                  id={field.name}
                  checked={consent}
                  onCheckedChange={(val) => {
                    setConsent(val as boolean);
                    if (touched.consent)
                      setFieldErrors((prev) => ({ ...prev, consent: "" }));
                  }}
                  className="sr-only"
                />
                <Label
                  htmlFor={field.name}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest leading-relaxed cursor-pointer transition-colors block",
                    hasError && !consent
                      ? "text-destructive hover:text-destructive/80"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  BY SUBMITTING THIS FORM, YOU CONSENT TO THE USE OF YOUR DATA
                  IN ACCORDANCE WITH OUR{" "}
                  <Link
                    href={privacyPolicyUrl as any}
                    className="underline underline-offset-4"
                  >
                    PRIVACY POLICY
                  </Link>
                  .
                </Label>
                {hasError && !consent && (
                  <p className="text-[10px] text-destructive uppercase tracking-wider mt-1.5 pl-2">
                    {fieldErrors[field.name]}
                  </p>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "h-12 px-8 rounded-full bg-text-primary text-text-on-dark hover:bg-text-secondary text-xs font-bold uppercase tracking-widest flex items-center gap-2",
            status === "loading" ? "cursor-not-allowed" : "cursor-pointer",
          )}
        >
          {status === "loading" ? "SENDING..." : "SEND REQUEST"}{" "}
          <span className="text-base leading-none translate-y-[-1px]">↗</span>
        </Button>
      </div>
    </form>
  );
}
