import { spawnSync } from 'node:child_process';
process.env.ASTRO_TELEMETRY_DISABLED = '1';
const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run(process.execPath, ['scripts/check.mjs']);
run('node', ['./node_modules/astro/astro.js', 'build']);
run('node', ['scripts/verify-build.mjs']);
