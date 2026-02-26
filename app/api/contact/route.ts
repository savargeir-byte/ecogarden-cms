import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'proctus@proctus.is';
const FROM_EMAIL = 'Eco Garden <onboarding@resend.dev>';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Nafn og netfang eru nauðsynleg.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Ný fyrirspurn frá ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 0;">
          <!-- Header -->
          <div style="background: #15803d; padding: 28px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 22px;">🌿 Eco Garden — Ný fyrirspurn</h1>
          </div>

          <!-- Body -->
          <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 140px; color: #6b7280; font-size: 14px; font-weight: 600;">Nafn</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; font-weight: 600;">Netfang</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;"><a href="mailto:${email}" style="color: #15803d;">${email}</a></td>
              </tr>
              ${phone ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; font-weight: 600;">Sími</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px;"><a href="tel:${phone}" style="color: #15803d;">${phone}</a></td>
              </tr>` : ''}
              ${company ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; font-weight: 600;">Fyrirtæki</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${company}</td>
              </tr>` : ''}
            </table>

            ${message ? `
            <div style="margin-top: 24px;">
              <p style="color: #6b7280; font-size: 14px; font-weight: 600; margin: 0 0 8px;">Skilaboð</p>
              <div style="background: #f9fafb; border-left: 4px solid #15803d; padding: 16px; border-radius: 4px; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>` : ''}

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <a href="mailto:${email}" style="display:inline-block; background: #15803d; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Svara ${name}
              </a>
            </div>
          </div>

          <!-- Footer -->
          <p style="text-align:center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
            Eco Garden · Lambhagavegur 9 · 110 Reykjavík · eccogarden.vercel.app
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Tókst ekki að senda. Reyndu aftur.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Villa kom upp. Reyndu aftur.' }, { status: 500 });
  }
}
