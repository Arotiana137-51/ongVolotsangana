// app/api/sendmail/route.js
import sendMail from '@lib/mailer';

export async function POST(req) {
 
  try {
    const { name, email, subject, message } = await req.json();
    await sendMail(name, email, subject, message);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'OPTIONS, POST',
    },
  });
}
