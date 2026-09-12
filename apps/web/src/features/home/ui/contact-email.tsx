import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'react-email';

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

export function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Incoming portfolio message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={topLabel}>[ INCOMING MESSAGE ]</Text>
            <Heading style={h1}>Contact Inquiry</Heading>
          </Section>

          <Section style={infoSection}>
            <table style={table} width="100%" cellPadding="0" cellSpacing="0">
              <tr>
                <td style={tdLabel} width="100">
                  FROM
                </td>
                <td style={tdValue}>{name}</td>
              </tr>
              <tr>
                <td style={tdLabel}>EMAIL</td>
                <td style={tdValue}>
                  <Link href={`mailto:${email}`} style={link}>
                    {email}
                  </Link>
                </td>
              </tr>
            </table>
          </Section>

          <Hr style={hr} />

          <Section style={messageSection}>
            <Text style={monoLabel}>MESSAGE</Text>
            <Text style={messageContent}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>&gt; ignaciofigueroa.dev / contact / incoming_msg</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  margin: '0 auto',
  padding: '48px',
  maxWidth: '600px',
};

const header = {
  marginBottom: '32px',
};

const topLabel = {
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '0.1em',
  color: '#000000',
  margin: '0 0 8px',
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const h1 = {
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1',
  color: '#000000',
  margin: '0',
  textTransform: 'uppercase' as const,
};

const infoSection = {
  marginBottom: '32px',
};

const table = {
  borderCollapse: 'collapse' as const,
};

const tdLabel = {
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '0.05em',
  color: '#666666',
  padding: '8px 0',
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const tdValue = {
  fontSize: '14px',
  color: '#000000',
  padding: '8px 0',
  fontWeight: '500',
};

const hr = {
  border: 'none',
  borderTop: '1px solid #eeeeee',
  margin: '32px 0',
};

const messageSection = {
  marginBottom: '32px',
};

const monoLabel = {
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '0.05em',
  color: '#666666',
  margin: '0 0 16px',
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const messageContent = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#000000',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const link = {
  color: '#000000',
  textDecoration: 'underline',
};

const footer = {
  marginTop: '48px',
  paddingTop: '32px',
  borderTop: '1px solid #eeeeee',
};

const footerText = {
  fontSize: '11px',
  color: '#999999',
  margin: '0',
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const footerLink = {
  color: '#000000',
  textDecoration: 'none',
  fontWeight: '700',
};
