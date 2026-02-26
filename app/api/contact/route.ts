import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const TO_EMAIL = 'proctus@proctus.is';
const FROM_EMAIL = 'Eco Garden <onboarding@resend.dev>';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, phone, address, service, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Nafn og netfang eru nauðsynleg.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Eco-Garden <onboarding@resend.dev>',
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Ný fyrirspurn frá ${name}${service ? ` — ${service}` : ''}`,
      template: {
        id: 'd36c30dc-c467-49c8-aa6d-7797f6ecdda2',
        variables: {
          NAME: name,
          EMAIL: email,
          PHONE: phone || '',
          ADDRESS: address || '',
          SERVICE: service || '',
          MESSAGE: message || '',
        },
      },
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
