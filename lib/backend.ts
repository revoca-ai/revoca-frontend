export async function forwardToBackend(
  path: string,
  body: unknown,
  logTag: string,
): Promise<void> {
  const baseUri = process.env.BACKEND_BASE_URI;
  if (!baseUri) return;

  const url = `${baseUri}${path}`;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Origin: "https://revocaai.xyz",
    };

    if (process.env.BETA_USERS_BEARER_TOKEN) {
      headers.Authorization = `Bearer ${process.env.BETA_USERS_BEARER_TOKEN}`;
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const bodyText = await res.text();
      console.warn(`[${logTag}] backend error`, {
        status: res.status,
        body: bodyText.slice(0, 300),
      });
    }
  } catch {
    console.warn(`[${logTag}] backend unreachable`);
  }
}
