import { educationTools } from './tools/education';
import { experienceTools } from './tools/experiences';
import { projectTools } from './tools/projects';
import { McpTool } from './types';

export const registeredTools: McpTool[] = [...projectTools, ...experienceTools, ...educationTools];
