import { NextResponse } from "next/server";
import { forwardToBackend } from "@/lib/backend";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, subject, description } = body;

  if (!name || !email || !subject || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    name,
    email,
    subject,
    description,
    receivedAt: new Date().toISOString(),
    type: "grievance",
  };

  await forwardToBackend("/grievance", payload, "grievance");

  return NextResponse.json({ success: true });
}
