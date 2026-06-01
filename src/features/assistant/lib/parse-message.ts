export const ASSISTANT_TAGS = {
  PROJECTS: '[SHOW_PROJECTS]',
  EXPERIENCE: '[SHOW_EXPERIENCE]',
  CONTACT: '[SHOW_CONTACT]',
  EMAIL_SENDING: '[EMAIL_SENDING]',
  EMAIL_SUCCESS: '[EMAIL_SUCCESS]',
  EMAIL_ERROR: '[EMAIL_ERROR]',
} as const;

export function parseMessageContent(content: string) {
  const showProjects = content.includes(ASSISTANT_TAGS.PROJECTS);
  const showExperience = content.includes(ASSISTANT_TAGS.EXPERIENCE);
  const showContact = content.includes(ASSISTANT_TAGS.CONTACT);
  const emailSending = content.includes(ASSISTANT_TAGS.EMAIL_SENDING);
  const emailSuccess =
    content.includes(ASSISTANT_TAGS.EMAIL_SUCCESS) || content.includes('[EMAIL_SUCCESS:');
  const emailError =
    content.includes(ASSISTANT_TAGS.EMAIL_ERROR) || content.includes('[EMAIL_ERROR:');

  // Extract custom success data if present
  let emailSuccessData: { name: string; email: string; message: string } | null = null;
  if (content.includes('[EMAIL_SUCCESS:')) {
    const successMatch = content.match(/\[EMAIL_SUCCESS:([\s\S]*?)\]/);
    if (successMatch) {
      try {
        emailSuccessData = JSON.parse(successMatch[1]);
      } catch (e) {
        console.error('Failed to parse email success data:', e);
      }
    }
  }

  // Extract custom error message if present
  let emailErrorMessage = '';
  if (content.includes('[EMAIL_ERROR:')) {
    const errorMatch = content.match(/\[EMAIL_ERROR:([\s\S]*?)\]/);
    if (errorMatch) {
      emailErrorMessage = errorMatch[1];
    }
  }

  // Clean trigger, error, and success tags and their arguments if present
  const cleanTriggerRegex = /\[SEND_EMAIL_TRIGGER\]\{.*\}/g;
  const cleanErrorRegex = /\[EMAIL_ERROR:.*?\]/g;
  const cleanSuccessRegex = /\[EMAIL_SUCCESS:.*?\]/g;
  let tempContent = content
    .replace(cleanTriggerRegex, '')
    .replace(cleanErrorRegex, '')
    .replace(cleanSuccessRegex, '');

  const tagsRegex = new RegExp(
    Object.values(ASSISTANT_TAGS)
      .map((tag) => tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|'),
    'g',
  );

  const cleanContent = tempContent.replace(tagsRegex, '').trim();

  return {
    showProjects,
    showExperience,
    showContact,
    emailSending,
    emailSuccess,
    emailError,
    emailErrorMessage,
    emailSuccessData,
    cleanContent,
  };
}
