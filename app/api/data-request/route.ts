import { NextResponse } from "next/server";
import { forwardToBackend } from "@/lib/backend";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, identifier, requestType, details } = body;

  if (!name || !email || !identifier || !requestType || !details) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    name,
    email,
    identifier,
    requestType,
    details,
    receivedAt: new Date().toISOString(),
    type: "data-request",
  };

  await forwardToBackend("/data-request", payload, "data-request");

  return NextResponse.json({ success: true });
}
