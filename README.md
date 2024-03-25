# Проект «Igor's Recipe Shop»
- Использовался API: 'https://dummyjson.com'

### 1 уровень 

- [x] Реализованы "Требования к функциональности"
- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем "LocalStorage".


#### React

- [x] Используются функциональные компоненты c хуками в приоритете над классовыми: https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/components/header/Header.tsx
- [x] Есть разделение на "умные": https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/components/input/Input.tsx и "глупые компоненты": https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/components/logo/Logo.tsx
- [x] Есть "рендеринг списков" : https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/features/mainContent/MainPageContent.tsx
- [x] Реализована хотя бы одна "форма" : https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/features/loginPageContent/formValidation/loginValidationSchema.ts
- [ ] Есть применение "Контекст API"(не использовал т.к Redux)
- [ ] Есть применение "предохранителя"(не использовал)
- [x] Есть хотя бы один "кастомный хук" : https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/hooks/useLocalStorage.ts
- [ ] Несколько компонентов используют "PropTypes" (использовал TS)
- [x] Поиск не должен триггерить много запросов к серверу
- [x] Есть применение "lazy + Suspense" : https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/features/mainContent/MainPageContent.tsx

#### Redux

- [x] Используется "Modern Redux with Redux Toolkit" : https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/store/recipeApi/recipesApi.ts
- [x] Используются "слайсы": https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/store/favoritesStore/favotitesSlice.ts
- [x] Используется "RTK Query" : https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/store/recipeApi/recipesApi.ts

### 2 уровень (необязательный)

- [x] Используется "TypeScript"
- [x] Реализована "низкая связанность" клиентского кода. <br>
  Для хранения учетных записей пользователей, их Избранного и Истории поиска, могут быть использованы "LocalStorage"
- [x] Используются "мемоизированные селекторы"

### Дополнительно

- [x] Проект собран при помощи "Vite"
- [x] Для работы с формами использовалась библиотека "react-hook-form"
- [x] Используется библиотека Mui "https://mui.com/"

## Что можно добавить в будущем:
Дизайн страницы с историей поиска и корректировку списка истории поиска

