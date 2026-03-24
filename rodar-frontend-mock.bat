@echo off
title Colibri - Frontend com Mock
cd /d "%~dp0"

echo =========================================
echo   Colibri Wireframe MVP - Frontend Mock
echo =========================================
echo.

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] npm nao encontrado. Instale o Node.js e tente novamente.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo [INFO] Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar dependencias.
        pause
        exit /b 1
    )
)

echo [INFO] Iniciando servidor de desenvolvimento com dados mock...
echo [INFO] Acesse: http://localhost:3000
echo.
set VITE_USE_MOCK=true
npm run dev

pause
