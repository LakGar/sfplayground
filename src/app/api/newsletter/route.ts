import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Email to SF Playground team
    try {
      const notificationEmail = await resend.emails.send({
        from: "SF Playground <hello@sfplayground.com>", // Update this with your verified domain
        to: "hello@sfplayground.com",
        replyTo: email, // Allow replying directly to the subscriber
        subject: "New Newsletter Subscription",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d5ff;">New Newsletter Subscription</h2>
            <p>A new subscriber has signed up for your newsletter:</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Subscribed on: ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      });
      console.log(
        "Notification email sent to hello@sfplayground.com:",
        notificationEmail
      );
    } catch (notificationError) {
      console.error(
        "Error sending notification email to hello@sfplayground.com:",
        notificationError
      );
      // Continue even if notification fails - still send welcome to user
    }

    // Welcome email to subscriber
    try {
      const welcomeEmail = await resend.emails.send({
        from: "SF Playground <hello@sfplayground.com>", // Update this with your verified domain
        to: email,
        subject: "Welcome to SF Playground!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d5ff;">Welcome to SF Playground!</h2>
            <p>Thank you for subscribing to our newsletter. You're now part of the SF Playground community!</p>
            <p>You'll receive:</p>
            <ul>
              <li>Exclusive updates on upcoming pitch events</li>
              <li>Featured startup stories and success cases</li>
              <li>Investor insights and industry trends</li>
              <li>Early access to event registrations</li>
            </ul>
            <p>We're excited to have you with us on this journey.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="color: #666; font-size: 14px;">
              Best regards,<br />
              The SF Playground Team<br />
              <a href="https://sfplayground.com" style="color: #00d5ff;">sfplayground.com</a>
            </p>
          </div>
        `,
      });
      console.log("Welcome email sent to subscriber:", welcomeEmail);
    } catch (welcomeError) {
      console.error("Error sending welcome email:", welcomeError);
      throw welcomeError; // Re-throw if welcome fails
    }

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in newsletter route:", error);
    return NextResponse.json(
      {
        error: "Failed to subscribe to newsletter",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
