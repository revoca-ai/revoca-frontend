"use client";

import { useState } from "react";
import Link from "next/link";

export default function GrievanceForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    await fetch("/api/grievance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, description }),
    }).catch(() => {});

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-6">
        <h3 className="text-[17px] font-semibold text-ink">Grievance submitted</h3>
        <p className="mt-2 text-[14px] leading-[1.7] text-body">
          We will acknowledge your grievance within 48 hours and aim to resolve it
          within 90 days. A confirmation will be sent to{" "}
          <strong className="font-medium text-ink">{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="grievance-name" className="mb-2 block text-[13px] font-medium text-body">
            Full name
          </label>
          <input
            id="grievance-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink"
            required
          />
        </div>
        <div>
          <label htmlFor="grievance-email" className="mb-2 block text-[13px] font-medium text-body">
            Email address
          </label>
          <input
            id="grievance-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="grievance-subject" className="mb-2 block text-[13px] font-medium text-body">
          Subject
        </label>
        <input
          id="grievance-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink"
          required
        />
      </div>

      <div>
        <label
          htmlFor="grievance-description"
          className="mb-2 block text-[13px] font-medium text-body"
        >
          Describe your grievance
        </label>
        <textarea
          id="grievance-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink"
          required
        />
      </div>


      <p className="text-[13px] leading-[1.6] text-faint">
        If your grievance is not resolved within 90 days, you may escalate to the
        Data Protection Board. See our{" "}
        <Link href="/privacy">Privacy Policy</Link> for details.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cursor-pointer rounded-lg bg-accent px-6 py-2.5 text-[14px] font-semibold text-[#04181d] transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit grievance"}
      </button>
    </form>
  );
}
