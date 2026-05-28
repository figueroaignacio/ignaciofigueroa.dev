import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { getPayload } from 'payload';
import { registeredTools } from '../mcp/registry';
import config from '../payload.config';

console.log = (...args: unknown[]) => console.error('[LOG]:', ...args);
console.info = (...args: unknown[]) => console.error('[INFO]:', ...args);
console.warn = (...args: unknown[]) => console.error('[WARN]:', ...args);

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadClient() {
  if (!payloadInstance) {
    console.error('Bootstrapping Payload Local API...');
    payloadInstance = await getPayload({ config });
    console.error('Payload Local API bootstrapped successfully.');
  }
  return payloadInstance;
}

const server = new McpServer({
  name: 'payload-copywriter-mcp',
  version: '1.0.0',
});

for (const tool of registeredTools) {
  server.registerTool(
    tool.name,
    {
      description: tool.description,
      inputSchema: tool.schema,
    },
    async (args: Record<string, unknown>) => {
      const payload = await getPayloadClient();
      return await tool.execute(args, payload);
    },
  );
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server connected and listening on Stdio.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
