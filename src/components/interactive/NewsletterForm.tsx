"use client";

import { useState } from "react";
import { NewsletterData } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

interface NewsletterFormProps {
  data: NewsletterData;
}

export function NewsletterForm({ data }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState(""); // Track actual API errors
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      // THE FIX: Call the actual backend API
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus("success");
        setEmail(""); // Clear the input on success
      } else {
        setStatus("error");
        setErrorMsg(result.message || data.error_message);
      }
    } catch {
      setStatus("error");
      setErrorMsg(data.error_message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[700px] mx-auto mt-8">
      <div className="flex flex-col">
        <div className="flex bg-[#262626] rounded-full overflow-hidden">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={data.input_placeholder || "EMAIL"}
            required
            maxLength={data.max_email_length || 254} // SECURITY FIX: Stop massive strings
            aria-label="Email address"
            className="flex-1 bg-transparent text-white placeholder:text-white/40 px-6 py-3 text-[14px] border-none outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={status === "loading" || !consent}
            className="w-24 h-auto bg-white rounded-full flex items-center justify-center flex-shrink-0 mr-1 my-1 hover:bg-white/90 transition-colors disabled:cursor-not-allowed"
            aria-label="Subscribe"
          >
            <ArrowRight className="size-5 text-black" aria-hidden="true" />
          </button>
        </div>

        <label className="flex items-center justify-center gap-3 mt-4 text-[13px] text-white/60 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="border border-white/40 w-4 h-4 rounded-none bg-transparent appearance-none cursor-pointer checked:bg-white"
          />
          <span
            dangerouslySetInnerHTML={{
              __html:
                data.consent_text ||
                "I agree to the <a href='/privacy-policy' class='underline'>Privacy Policy</a>",
            }}
          />
        </label>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="mt-4 overflow-hidden"
          >
            <p
              role="status"
              className="text-green-400 text-center text-[13px] font-medium"
            >
              {data.success_message}
            </p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : undefined}
            className="mt-4 overflow-hidden"
          >
            <p
              role="alert"
              className="text-red-400 text-center text-[13px] font-medium"
            >
              {errorMsg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
