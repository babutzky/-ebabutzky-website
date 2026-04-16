import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const json = await request.json().catch(() => null);

  if (!json) {
    return new Response(JSON.stringify({ error: 'Ungültige Anfrage.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, email, anliegen } = json as {
    name?: string;
    email?: string;
    anliegen?: string;
  };

  if (!email?.trim() || !anliegen?.trim()) {
    return new Response(JSON.stringify({ error: 'Pflichtfelder fehlen.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY nicht gesetzt.');
    return new Response(JSON.stringify({ error: 'Serverkonfiguration unvollständig.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  const subject = name?.trim()
    ? `Anfrage von ${name.trim()}`
    : 'Anfrage über ebabutzky.com';

  const text = [
    name?.trim() ? `Name: ${name.trim()}` : '',
    `E-Mail: ${email.trim()}`,
    '',
    anliegen.trim(),
  ]
    .filter(Boolean)
    .join('\n');

  const { error } = await resend.emails.send({
    // Absender-Domain muss in Resend verifiziert sein (ebabutzky.com)
    from: 'Kontaktformular EBABUTZKY <anfrage@ebabutzky.com>',
    to:      'anfrage@ebabutzky.com',
    replyTo: email.trim(),
    subject,
    text,
  });

  if (error) {
    console.error('Resend Fehler:', error);
    return new Response(JSON.stringify({ error: 'Versand fehlgeschlagen.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
