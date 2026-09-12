export interface Message {
  id?: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: string | number;
}
