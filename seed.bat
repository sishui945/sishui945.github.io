@echo off
cd /d "%~dp0backend"
echo Running seed...
npx tsx prisma/seed.ts
pause
