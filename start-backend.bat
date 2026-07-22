@echo off
cd /d %~dp0backend

npx kill-port 3000 2>nul

npx tsx --watch src/main.ts
