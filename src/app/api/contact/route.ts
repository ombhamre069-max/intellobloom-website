import { NextResponse } from "next/server";

type ContactPayload = {
  fullName: string;
  email: string;
  organization: string;
  industry: string;
  interest: string;
  message: string;
};

export async function POST(request: Request) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;

  if (!webhookUrl && !(resendKey && contactTo)) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error:
          "Contact form is not connected. Set CONTACT_WEBHOOK_URL or RESEND_API_KEY with CONTACT_TO_EMAIL.",
      },
      { status: 503 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const required = [
    "fullName",
    "email",
    "organization",
    "industry",
    "interest",
    "message",
  ] as const;

  for (const key of required) {
    if (!body[key]?.trim()) {
      return NextResponse.json(
        { ok: false, error: `Missing field: ${key}` },
        { status: 400 },
      );
    }
  }

  try {
    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "intellibloom-website",
          submittedAt: new Date().toISOString(),
          ...body,
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Upstream webhook rejected the submission." },
          { status: 502 },
        );
      }
    } else if (resendKey && contactTo) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: contactTo,
          subject: `[Intellobloom] ${body.interest} — ${body.organization}`,
          text: [
            `Name: ${body.fullName}`,
            `Email: ${body.email}`,
            `Organization: ${body.organization}`,
            `Industry: ${body.industry}`,
            `Interest: ${body.interest}`,
            "",
            body.message,
          ].join("\n"),
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Email delivery failed." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to deliver message." },
      { status: 502 },
    );
  }
}
