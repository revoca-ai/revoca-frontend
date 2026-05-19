import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email } = await request.json();

  const baseUri = process.env.BACKEND_BASE_URI;
  if (!baseUri) {
    return NextResponse.json({ error: "Backend not configured" }, { status: 500 });
  }

  const url = `${baseUri}/beta-signup`;
  const tokenPresent = Boolean(process.env.BETA_USERS_BEARER_TOKEN);
  const tokenLen = process.env.BETA_USERS_BEARER_TOKEN?.length ?? 0;

  console.log("[beta-signup] →", { url, tokenPresent, tokenLen });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.BETA_USERS_BEARER_TOKEN}`,
      "Origin": "https://revocaai.xyz",
    },
    body: JSON.stringify({ name, email }),
  });

  const bodyText = await res.text();
  console.log("[beta-signup] ←", {
    status: res.status,
    server: res.headers.get("server"),
    contentType: res.headers.get("content-type"),
    body: bodyText.slice(0, 500),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Backend error", status: res.status, body: bodyText.slice(0, 500) },
      { status: res.status },
    );
  }

  return NextResponse.json({ success: true });
}
