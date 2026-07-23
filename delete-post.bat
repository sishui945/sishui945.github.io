@echo off
cd /d "%~dp0backend"
if "%~1"=="" goto usage
npx tsx delete.ts post %~1
goto end
:usage
echo Usage: delete-post.bat ^<slug^>
echo Example: delete-post.bat cpp-fundation
pause
exit /b
:end
pause
