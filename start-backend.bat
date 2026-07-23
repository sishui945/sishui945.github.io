@echo off
cd /d %~dp0backend
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /F /PID %%a >nul 2>nul
npx tsx --watch src/main.ts
