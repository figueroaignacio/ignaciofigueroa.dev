import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { mcpTools } from './tools';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const server = new McpServer({ name: 'portfolio-cms-mcp', version: '1.0.0' });

  for (const tool of mcpTools) {
    server.registerTool(
      tool.name,
      { description: tool.description, inputSchema: tool.schema },
      (args: Record<string, unknown>) => tool.execute(args, app),
    );
  }

  await server.connect(new StdioServerTransport());
  console.error('MCP server connected over stdio.');
}

bootstrap().catch((error) => {
  console.error('Fatal MCP error:', error);
  process.exit(1);
});
