'use server';

import { Resend } from 'resend';
import { ContactEmail } from '../components/contact-email';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormState = {
  error: string | null;
  success: boolean;
};

export async function sendContactEmailAction(fields: {
  name: string;
  email: string;
  message: string;
}): Promise<ContactFormState> {
  const { name, email, message } = fields;

  if (!name || !email || !message) {
    return {
      error: 'Missing fields',
      success: false,
    };
  }

  try {
    const contactEmail = process.env.CONTACT_EMAIL || 'contact@ignaciofigueroa.dev';
    const fromEmail = 'Portfolio Contact <onboarding@resend.dev>';

    const data = await resend.emails.send({
      from: fromEmail,
      to: [contactEmail],
      subject: `Message from ${name} | (${email})`,
      replyTo: email,
      react: ContactEmail({ name, email, message }) as React.ReactElement,
    });

    if (data.error) {
      return {
        error: data.error.message,
        success: false,
      };
    }

    return {
      error: null,
      success: true,
    };
  } catch {
    return {
      error: 'Internal Server Error',
      success: false,
    };
  }
}

export async function sendEmail(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  return sendContactEmailAction({ name, email, message });
}
