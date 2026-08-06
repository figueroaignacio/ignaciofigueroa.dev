/** Tool names come straight from the backend tool registry. */
export type ToolName =
  'get_projects' | 'get_experience' | 'send_contact_email' | 'analyze_job_description';

export type StreamEvent =
  { type: 'text'; delta: string } | { type: 'tool'; status: 'start' | 'end'; name: ToolName };

export function createEventParser() {
  let buffer = '';

  function parse(line: string, out: StreamEvent[]) {
    if (!line.trim()) return;
    try {
      out.push(JSON.parse(line) as StreamEvent);
    } catch {}
  }

  return {
    push(chunk: string): StreamEvent[] {
      buffer += chunk;
      const events: StreamEvent[] = [];
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) parse(line, events);
      return events;
    },

    flush(): StreamEvent[] {
      const events: StreamEvent[] = [];
      parse(buffer, events);
      buffer = '';
      return events;
    },
  };
}
