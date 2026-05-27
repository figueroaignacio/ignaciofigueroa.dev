import { neon } from '@neondatabase/serverless';

type QueryResult = {
  rows: Record<string, unknown>[];
  rowCount?: number;
};

const sql = neon(process.env.POSTGRES_URL!);

export const pool = {
  query: async (text: string, params: unknown[] = []): Promise<QueryResult> => {
    const result = await sql.query(text, params, { fullResults: true });
    return {
      rows: result.rows as QueryResult['rows'],
      rowCount: result.rowCount,
    };
  },
};
