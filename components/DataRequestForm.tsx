"use client";

import { useState } from "react";
import Link from "next/link";

type RequestType =
  | "access"
  | "correction"
  | "erasure"
  | "nomination"
  | "withdraw-consent"
  | "other";

const REQUEST_LABELS: Record<RequestType, string> = {
  access: "Access / export my data",
  correction: "Correct my data",
  erasure: "Delete my data",
  nomination: "Register a nominee",
  "withdraw-consent": "Withdraw consent",
  other: "Other data protection request",
};

export default function DataRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("access");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    await fetch("/api/data-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        identifier,
        requestType,
        details,
      }),
    }).catch(() => {});

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-6">
        <h3 className="text-[17px] font-semibold text-ink">Request received</h3>
        <p className="mt-2 text-[14px] leading-[1.7] text-body">
          We have recorded your request and will acknowledge it within 7 business
          days. If we need additional information, we will contact you at{" "}
          <strong className="font-medium text-ink">{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="request-type" className="mb-2 block text-[13px] font-medium text-body">
          Request type
        </label>
        <select
          id="request-type"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value as RequestType)}
          className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink"
          required
        >
          {Object.entries(REQUEST_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[13px] font-medium text-body">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-body">
            Registered email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="identifier" className="mb-2 block text-[13px] font-medium text-body">
          Account identifier
        </label>
        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Account ID, workspace name, or registered mobile number"
          className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink placeholder:text-faint"
          required
        />
      </div>

      <div>
        <label htmlFor="details" className="mb-2 block text-[13px] font-medium text-body">
          Details of your request
        </label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-line bg-raise px-4 py-2.5 text-[14px] text-ink"
          required
        />
      </div>

      <p className="text-[13px] leading-[1.6] text-faint">
        By submitting this form you confirm the information is accurate. See our{" "}
        <Link href="/privacy">Privacy Policy</Link> for how we handle requests.
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cursor-pointer rounded-lg bg-accent px-6 py-2.5 text-[14px] font-semibold text-[#04181d] transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
