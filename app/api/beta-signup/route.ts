import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email } = await request.json();

  const baseUri = process.env.BACKEND_BASE_URI;
  if (!baseUri) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 500 });
  }

  const res = await fetch(`${baseUri}/beta-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Backend error" }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}
