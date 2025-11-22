@echo off
echo ==============================
echo Iniciando setup del proyecto
echo ==============================

:: 1️⃣ Verificar que Node.js esté instalado
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js no esta instalado. Descargalo de https://nodejs.org/
    pause
    exit /b
)

:: 2️⃣ Instalar dependencias
echo Instalando dependencias del proyecto...
npm install --legacy-peer-deps

:: 3️⃣ Instalar librerías adicionales necesarias
echo Instalando librerias adicionales...
npm install react-router-dom react-hot-toast @headlessui/react @heroicons/react
npm install --save-dev tailwindcss postcss autoprefixer vite-plugin-react

:: 4️⃣ Inicializar TailwindCSS si no existe
IF NOT EXIST tailwind.config.js (
    echo Inicializando TailwindCSS...
    npx tailwindcss init -p
)

:: 5️⃣ Ejecutar servidor de desarrollo
echo Levantando servidor de desarrollo...
start npm run dev

echo ==============================
echo Setup completado!
echo ==============================
pause
