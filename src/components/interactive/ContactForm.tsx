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
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (status === "success" && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [status]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTextFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0] || null);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData();
    Object.entries(textFields).forEach(([key, value]) =>
      formData.append(key, value),
    );
    Object.entries(radioValues).forEach(([key, value]) =>
      formData.append(key, value),
    );
    formData.append("consent", consent ? "true" : "false");

    if (file) {
      formData.append("file_attachment", file);
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
        setErrorMsg(data.message || formConfig.error_message);
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(formConfig.error_message);
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
      {status === "error" && (
        <div
          role="alert"
          className="p-4 bg-destructive/10 text-destructive rounded-base border border-destructive/20"
        >
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {formConfig.fields.map((field) => {
          const isHalfWidth =
            field.name === "first_name" || field.name === "last_name";
          const gridClass = isHalfWidth
            ? "col-span-1"
            : "col-span-1 md:col-span-2";

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
                  aria-required={field.required ? "true" : undefined}
                  value={textFields[field.name] || ""}
                  onChange={handleTextChange}
                  className="bg-transparent h-[52px] text-xs uppercase tracking-wider text-text-primary border-border-subtle hover:border-text-primary transition-colors focus-visible:ring-text-primary focus-visible:border-text-primary placeholder:text-text-primary"
                />
              </div>
            );
          }

          if (field.type === "textarea") {
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
                  aria-required={field.required ? "true" : undefined}
                  value={textFields[field.name] || ""}
                  onChange={handleTextChange}
                  className="bg-transparent min-h-[120px] text-xs uppercase tracking-wider text-text-primary border-border-subtle hover:border-text-primary transition-colors focus-visible:ring-text-primary focus-visible:border-text-primary placeholder:text-text-primary"
                />
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
                  onValueChange={(val) =>
                    setRadioValues((prev) => ({ ...prev, [field.name]: val }))
                  }
                  className="flex flex-col sm:flex-row gap-4"
                  required={field.required}
                  aria-required={field.required ? "true" : undefined}
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
                        )}
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
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
                {field.max_file_size_mb && (
                  <p className="text-[11px] text-text-secondary uppercase tracking-wider mb-2">
                    Maximum allowed size: {field.max_file_size_mb} MB
                  </p>
                )}
                <div className="flex flex-col items-start gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    aria-controls={`${field.name}-input`}
                    className="h-10 px-6 rounded-full border border-border-subtle text-xs uppercase tracking-wider text-text-primary hover:border-text-primary bg-transparent"
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
                    accept="*/*"
                    onChange={handleFileChange}
                    className="sr-only"
                    required={field.required && !file}
                    aria-required={field.required ? "true" : undefined}
                    aria-describedby={
                      field.max_file_size_mb &&
                      file &&
                      file.size / (1024 * 1024) > field.max_file_size_mb
                        ? `${field.name}-error`
                        : undefined
                    }
                  />
                </div>
                {file &&
                  field.max_file_size_mb &&
                  file.size / (1024 * 1024) > field.max_file_size_mb && (
                    <p
                      id={`${field.name}-error`}
                      role="alert"
                      className="text-[11px] text-destructive uppercase tracking-wider mt-2"
                    >
                      {field.validation_message ||
                        `File exceeds ${field.max_file_size_mb}MB limit.`}
                    </p>
                  )}
              </div>
            );
          }

          if (field.type === "checkbox" && field.name === "consent") {
            return (
              <div
                key={field.name}
                className="col-span-1 md:col-span-2 pt-8 mt-4 border-t border-transparent"
              >
                <Checkbox
                  id={field.name}
                  checked={consent}
                  onCheckedChange={(val) => setConsent(val as boolean)}
                  required={field.required}
                  aria-required={field.required ? "true" : undefined}
                  className="sr-only"
                />
                <Label
                  htmlFor={field.name}
                  className="text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-relaxed cursor-pointer hover:text-text-primary transition-colors block"
                >
                  BY SUBMITTING THIS FORM, YOU CONSENT TO THE USE OF YOUR DATA
                  IN ACCORDANCE WITH OUR{" "}
                  <Link
                    href={privacyPolicyUrl as any}
                    className="underline underline-offset-4 hover:text-text-primary"
                  >
                    PRIVACY POLICY
                  </Link>
                  .
                </Label>
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
