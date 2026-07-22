@echo off
cd /d %~dp0frontend

npx kill-port 5173 2>nul

npx vite --port 5173
