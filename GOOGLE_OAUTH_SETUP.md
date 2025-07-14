# Настройка Google OAuth для NextAuth.js

## Шаг 1: Настройка Google Cloud Console

### 1.1 Создание проекта
1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API (если еще не включен)

### 1.2 Создание OAuth 2.0 учетных данных
1. В меню слева выберите "APIs & Services" > "Credentials"
2. Нажмите "Create Credentials" > "OAuth 2.0 Client IDs"
3. Выберите тип приложения: "Web application"
4. Заполните форму:
   - **Name**: GitHub Summarizer (или любое другое имя)
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (для разработки)
     - `https://your-domain.com` (для продакшена)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (для разработки)
     - `https://your-domain.com/api/auth/callback/google` (для продакшена)

### 1.3 Получение учетных данных
После создания вы получите:
- **Client ID** (например: `123456789-abcdef.apps.googleusercontent.com`)
- **Client Secret** (например: `GOCSPX-abcdefghijklmnop`)

## Шаг 2: Настройка переменных окружения

### 2.1 Создание файла .env.local
Создайте файл `.env.local` в корне проекта:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

### 2.2 Генерация NEXTAUTH_SECRET
Для генерации секретного ключа выполните в терминале:

```bash
openssl rand -base64 32
```

Или используйте онлайн генератор: https://generate-secret.vercel.app/32

## Шаг 3: Проверка конфигурации

### 3.1 Запуск приложения
```bash
npm run dev
```

### 3.2 Тестирование аутентификации
1. Откройте http://localhost:3000
2. Нажмите кнопку "Войти через Google"
3. Выберите аккаунт Google
4. Разрешите доступ приложению
5. Вы должны быть перенаправлены в `/dashboards`

## Шаг 4: Настройка для продакшена

### 4.1 Обновление Google OAuth настроек
В Google Cloud Console добавьте продакшен домен:
- **Authorized JavaScript origins**: `https://your-domain.com`
- **Authorized redirect URIs**: `https://your-domain.com/api/auth/callback/google`

### 4.2 Обновление переменных окружения
```bash
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Шаг 5: Дополнительная настройка

### 5.1 Настройка базы данных (опционально)
Если вы хотите сохранять сессии в базе данных, добавьте адаптер:

```bash
npm install @auth/prisma-adapter prisma
```

### 5.2 Настройка JWT (опционально)
Для кастомных JWT токенов добавьте в конфигурацию:

```javascript
jwt: {
  secret: process.env.NEXTAUTH_SECRET,
  maxAge: 60 * 60 * 24 * 30, // 30 days
}
```

## Устранение неполадок

### Проблема: "Error: redirect_uri_mismatch"
**Решение**: Проверьте, что URI в Google Console точно совпадает с вашим доменом

### Проблема: "Error: invalid_client"
**Решение**: Проверьте правильность GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET

### Проблема: "Error: access_denied"
**Решение**: Пользователь отменил авторизацию. Это нормально.

### Проблема: Сессии не сохраняются
**Решение**: 
1. Проверьте NEXTAUTH_SECRET
2. Убедитесь, что NEXTAUTH_URL правильный
3. Проверьте, что провайдер SessionProvider обертывает приложение

## Безопасность

### Рекомендации:
1. Никогда не коммитьте `.env.local` в git
2. Используйте разные секреты для разработки и продакшена
3. Регулярно обновляйте секреты
4. Используйте HTTPS в продакшене
5. Настройте CSP заголовки

### Переменные окружения для продакшена:
```bash
# Vercel
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET

# Netlify
# Добавьте в настройках сайта > Environment variables
``` 