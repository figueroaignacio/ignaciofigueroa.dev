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
  const emailSuccess = content.includes(ASSISTANT_TAGS.EMAIL_SUCCESS);
  const emailError =
    content.includes(ASSISTANT_TAGS.EMAIL_ERROR) || content.includes('[EMAIL_ERROR:');

  // Extract custom error message if present
  let emailErrorMessage = '';
  if (content.includes('[EMAIL_ERROR:')) {
    const errorMatch = content.match(/\[EMAIL_ERROR:([\s\S]*?)\]/);
    if (errorMatch) {
      emailErrorMessage = errorMatch[1];
    }
  }

  // Clean trigger tag and its json arguments if present
  const cleanTriggerRegex = /\[SEND_EMAIL_TRIGGER\]\{.*\}/g;
  const cleanErrorRegex = /\[EMAIL_ERROR:.*?\]/g;
  let tempContent = content.replace(cleanTriggerRegex, '').replace(cleanErrorRegex, '');

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
    cleanContent,
  };
}
