@echo off
chcp 65001 >nul
cd /d "e:\My world"
echo ============================================
echo   启动开发服务器
echo ============================================
echo.

:: 杀掉所有残留 node 进程（解决端口漂移问题）
echo [1/3] 清理所有 node 进程...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

:: 清掉 .next 编译缓存（避免脏状态）
echo [2/3] 清理编译缓存...
if exist ".next" rmdir /S /Q ".next" >nul 2>&1

:: 启动 dev server
echo [3/3] 启动开发服务器...
echo.
echo 浏览器访问：http://localhost:3000
echo 按 Ctrl+C 停止
echo.

npm run dev

pause
