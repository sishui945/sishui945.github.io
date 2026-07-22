@echo off
cd /d %~dp0frontend

echo Checking port 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
  echo Killing PID %%a on port 5173...
  taskkill /F /PID %%a 2>nul
  timeout /t 1 /nobreak >nul
)

npx vite --port 5173
