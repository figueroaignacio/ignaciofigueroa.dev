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

  let emailErrorMessage = '';
  if (content.includes('[EMAIL_ERROR:')) {
    const errorMatch = content.match(/\[EMAIL_ERROR:([\s\S]*?)\]/);
    if (errorMatch) {
      emailErrorMessage = errorMatch[1];
    }
  }

  const showPitch = content.includes('[SHOW_PITCH:');
  let pitchData: {
    match_score: number;
    role: string;
    company: string;
    pitch: string;
  } | null = null;

  let tempContent = content;

  if (showPitch) {
    const tagStart = content.indexOf('[SHOW_PITCH:');
    const jsonStart = content.indexOf('{', tagStart);

    if (jsonStart !== -1) {
      let depth = 0;
      let jsonEnd = -1;
      let inString = false;
      let escape = false;

      for (let i = jsonStart; i < content.length; i++) {
        const ch = content[i];

        if (escape) {
          escape = false;
          continue;
        }
        if (ch === '\\' && inString) {
          escape = true;
          continue;
        }
        if (ch === '"') {
          inString = !inString;
          continue;
        }
        if (inString) continue;

        if (ch === '{') depth++;
        else if (ch === '}') {
          depth--;
          if (depth === 0) {
            jsonEnd = i;
            break;
          }
        }
      }

      if (jsonEnd !== -1) {
        const rawJson = content.substring(jsonStart, jsonEnd + 1);
        const tagEnd = content.indexOf(']', jsonEnd);
        const rawTag =
          tagEnd !== -1
            ? content.substring(tagStart, tagEnd + 1)
            : content.substring(tagStart, jsonEnd + 1);

        try {
          const sanitizedJson = rawJson
            .replace(/\\'/g, "'")
            .replace(/\\(?!(["\\/bfnrt]|u[0-9a-fA-F]{4}))/g, '');

          pitchData = JSON.parse(sanitizedJson);
        } catch (e) {
          console.error('Failed to parse pitch data:', e);
        }

        tempContent = content.replace(rawTag, '');
      }
    }
  }

  const cleanTriggerRegex = /\[SEND_EMAIL_TRIGGER\]\{.*\}/g;
  const cleanErrorRegex = /\[EMAIL_ERROR:.*?\]/g;
  const cleanSuccessRegex = /\[EMAIL_SUCCESS:.*?\]/g;

  tempContent = tempContent
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
    showPitch,
    pitchData,
    cleanContent,
  };
}
