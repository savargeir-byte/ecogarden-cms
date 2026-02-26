import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const FROM_EMAIL = 'Eco-Garden <onboarding@resend.dev>';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();

    if (!body.name || !body.email) {
      return NextResponse.json({ error: 'Nafn og netfang eru nauðsynleg.' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Eco-Garden <onboarding@resend.dev>',
      to: ['proctus@proctus.is'],
      template: {
        id: 'd36c30dc-c467-49c8-aa6d-7797f6ecdda2',
        variables: {
          NAME: body.name,
          EMAIL: body.email,
          PHONE: body.phone,
          ADDRESS: body.address,
          SERVICE: body.service,
          MESSAGE: body.message,
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
