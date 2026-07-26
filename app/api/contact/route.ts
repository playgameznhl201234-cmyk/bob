import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

/**
 * Contact endpoint with server-side Google reCAPTCHA verification.
 *
 * Flow: the browser sends the form fields + the reCAPTCHA token here. We
 * verify the token with Google using the SECRET key (which never touches the
 * browser), and only if Google confirms the visitor is human do we deliver
 * the email. This is what makes the reCAPTCHA real — a bot can't get an
 * email through without passing Google's challenge.
 *
 * Requires the RECAPTCHA_SECRET_KEY env var (see README "Google reCAPTCHA").
 * If it isn't set, returns 501 and the form falls back to the slide-to-verify
 * check on the client.
 */
export async function POST(request: Request) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "not_configured" }, { status: 501 });
  }

  let body: Record<string, string> & { token?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const token = body.token;
  if (!token) {
    return NextResponse.json({ error: "missing_token" }, { status: 400 });
  }

  // 1. Verify the reCAPTCHA token with Google.
  try {
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      },
    );
    const verify: { success?: boolean; score?: number } = await verifyRes.json();
    if (!verify.success) {
      return NextResponse.json({ error: "recaptcha_failed" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "verify_error" }, { status: 502 });
  }

  // 2. Human confirmed — deliver the email via FormSubmit (server-side).
  const payload = {
    name: body.name ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    goal: body.goal ?? "",
    preferred_time: body.preferred_time ?? "",
    message: body.message ?? "",
    _subject: "New consultation request — PainFreeDiana website",
  };

  try {
    const fsRes = await fetch(
      `https://formsubmit.co/ajax/${siteConfig.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // FormSubmit requires a browser-like Referer for server-side calls.
          Referer: `${siteConfig.url}/`,
          Origin: siteConfig.url,
        },
        body: JSON.stringify(payload),
      },
    );
    const fs: { success?: string } = await fsRes.json().catch(() => ({}));
    if (fsRes.ok && `${fs.success}` === "true") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "delivery_error" }, { status: 502 });
  }
}
