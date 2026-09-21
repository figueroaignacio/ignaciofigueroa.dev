import postgres from 'postgres';
const sql = postgres(process.argv[2], { prepare: false, connect_timeout: 10, max: 1 });
try { const [r] = await sql`select count(*)::int as n from projects`; console.log('DB OK, proyectos:', r.n); }
catch (e) { console.log('DB FAIL', e.code || '', e.message.slice(0, 120)); }
finally { await sql.end({ timeout: 3 }); }
