$ErrorActionPreference='Stop'
$env:ASTRO_TELEMETRY_DISABLED='1'
npm run check
if($LASTEXITCODE -ne 0){exit $LASTEXITCODE}
& .\node_modules\.bin\astro build
if($LASTEXITCODE -ne 0){exit $LASTEXITCODE}
node scripts/verify-build.mjs
exit $LASTEXITCODE
