import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const resend = process.env.RESEND_API_KEY
      ? new Resend(process.env.RESEND_API_KEY)
      : null;

    const body = await request.json();
    const {
      name,
      email,
      phone,
      coachingPlan,
      message,
    }: {
      name?: string;
      email?: string;
      phone?: string;
      coachingPlan?: string;
      message?: string;
    } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    if (resend) {
      const teamRecipients = [
        "hello@sfplayground.com",
        "staff@sfplaygroundai.com",
      ];

      const notificationEmail = await resend.emails.send({
        from: "SF Playground <hello@sfplayground.com>",
        to: teamRecipients,
        replyTo: email,
        subject: `New Contact Form: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
            <h2 style="color: #ffffff;">New Contact Form Submission</h2>
            <div style="background: #f5f5f5; padding: 18px 20px; border-radius: 8px; margin: 18px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
              ${
                coachingPlan
                  ? `<p><strong>Coaching plan:</strong> ${coachingPlan}</p>`
                  : ""
              }
            </div>
            <div style="background: #f5f5f5; padding: 18px 20px; border-radius: 8px; margin: 18px 0;">
              <h3 style="margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
            </div>
          </div>
        `,
      });

      console.log(
        "Contact notification email sent to team recipients:",
        notificationEmail,
      );

      // Confirmation email to the submitter
      await resend.emails.send({
        from: "SF Playground <hello@sfplayground.com>",
        to: email,
        subject: "Thanks for reaching out to SF Playground",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ffffff;">Thanks, ${name}!</h2>
            <p>We&apos;ve received your message and will get back to you soon.</p>
            <p style="color: #666; font-size: 14px;">
              Best regards,<br />
              The SF Playground Team
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      { message: "Message sent successfully", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

