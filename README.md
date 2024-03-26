# Проект «Igor's Recipe Shop»

 * Это приложение по поиску и покупке рецептов блюд.

- Использовался API: 'https://dummyjson.com'

### 1 уровень 

- [x] Реализованы "Требования к функциональности"

 * Регистрация и авторизация пользователей (регистрация с чекбоксом на подтверждение возраста)
 * Хранение истории поиска авторизованого пользователя
 * Реализация избранного и корзины (если пользователь ничего не добавил, об этом есть информация)

- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем "LocalStorage".


#### React

- [x] Используются [функциональные компоненты](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/components/header/Header.tsx) c хуками в приоритете над классовыми
- [x] Есть разделение на ["умные"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/features/recipeCard/RecipeCard.tsx) и ["глупые компоненты"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/components/logo/Logo.tsx)
- [x] Есть ["рендеринг списков"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/features/mainContent/MainPageContent.tsx)
- [x] Реализована хотя бы одна ["форма"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/features/loginPageContent/LoginPageContent.tsx)
- [x] Есть применение ["Контекст API"](не использовал т.к Redux)
- [x] Есть применение "предохранителя"(не использовал)
- [x] Есть хотя бы один ["кастомный хук"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/hooks/useAuth.ts)
- [x] Несколько компонентов используют "PropTypes" (использовал TS)
- [x] Поиск не должен триггерить много запросов к серверу
- [x] Есть применение ["lazy + Suspense"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/features/mainContent/MainPageContent.tsx)

#### Redux

- [x] Используется ["Modern Redux with Redux Toolkit"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/store/recipeApi/recipesApi.ts)
- [x] Используются ["слайсы"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/store/favoritesStore/favotitesSlice.ts)
- [ ] Есть хотя бы одна кастомная мидлвара
- [x] Используется ["RTK Query"](https://github.com/gavabatya/IgorRecipeDealerApp/blob/main/src/store/recipeApi/recipesApi.ts)
- [ ] Используется Transforming Responses 

### 2 уровень (необязательный)

- [x] Используется "TypeScript"
- [x] Реализована "низкая связанность" клиентского кода. <br>
  Для хранения учетных записей пользователей, их Избранного и Истории поиска, могут быть использованы "LocalStorage"
- [x] Используются "мемоизированные селекторы"

### Дополнительно

- [x] Проект собран при помощи "Vite"
- [x] Для работы с формами использовалась библиотека "react-hook-form"
- [x] Используется библиотека [Mui](https://mui.com/)

## Что можно добавить в будущем:
 * Дизайн страницы с историей поиска и корректировку списка истории поиска
 * Реализацию деплоя на github.pages


