import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      founderName,
      email,
      phone,
      startupName,
      stage,
      industry,
      description,
      website,
    } = body;

    // Validate required fields
    if (
      !founderName ||
      !email ||
      !startupName ||
      !stage ||
      !industry ||
      !description
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email to SF Playground team
    try {
      const notificationEmail = await resend.emails.send({
        from: "SF Playground <hello@sfplayground.com>", // Update this with your verified domain
        to: "hello@sfplayground.com",
        replyTo: email, // Allow replying directly to the applicant
        subject: `New Pitch Application: ${startupName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d5ff;">New Pitch Application</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Startup Information</h3>
              <p><strong>Startup Name:</strong> ${startupName}</p>
              <p><strong>Industry:</strong> ${industry}</p>
              <p><strong>Funding Stage:</strong> ${stage}</p>
              ${
                website
                  ? `<p><strong>Website:</strong> <a href="${website}">${website}</a></p>`
                  : ""
              }
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Founder Information</h3>
              <p><strong>Name:</strong> ${founderName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Pitch Description</h3>
              <p style="white-space: pre-wrap;">${description}</p>
            </div>
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
      // Continue even if notification fails - still send confirmation to user
    }

    // Confirmation email to applicant
    try {
      const confirmationEmail = await resend.emails.send({
        from: "SF Playground <hello@sfplayground.com>", // Update this with your verified domain
        to: email,
        subject: "Thank You for Your Pitch Application",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00d5ff;">Thank You, ${founderName}!</h2>
            <p>We've received your pitch application for <strong>${startupName}</strong>.</p>
            <p>Our team will review your application and get back to you within 5 business days.</p>
            <p>In the meantime, feel free to reach out if you have any questions.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="color: #666; font-size: 14px;">
              Best regards,<br />
              The SF Playground Team
            </p>
          </div>
        `,
      });
      console.log("Confirmation email sent to applicant:", confirmationEmail);
    } catch (confirmationError) {
      console.error("Error sending confirmation email:", confirmationError);
      throw confirmationError; // Re-throw if confirmation fails
    }

    return NextResponse.json(
      { message: "Application submitted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in apply route:", error);
    return NextResponse.json(
      {
        error: "Failed to submit application",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
