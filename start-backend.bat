@echo off
cd /d %~dp0backend

echo Checking port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
  echo Killing PID %%a on port 3000...
  taskkill /F /PID %%a 2>nul
  timeout /t 1 /nobreak >nul
)

npx tsx --watch src/main.ts
