@echo off
cd /d %~dp0backend
npx tsx --watch src/main.ts
