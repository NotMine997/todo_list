# 1. Установить Ollama (если ещё нет)
# 2. Скачать модель
ollama pull deepseek-r1:1.5b

# 3. Установить зависимости
npm install

# 4. Настроить .env (скопировать из .env.example)
cp .env.example .env

# 5. Запустить
npm run dev