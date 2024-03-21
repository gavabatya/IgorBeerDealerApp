### 1 уровень (обязательный - необходимый минимум)

- [x] Реализованы`Требования к функциональности`

#### React

- [x] Используются функциональные компоненты c хуками в приоритете над классовыми
- [x] Есть разделение на `умные` и `глупые компоненты`
- [x] Есть `рендеринг списков`
- [x] Реализована хотя бы одна `форма`
- [x] Есть применение `Контекст API`
- [x] Есть применение `предохранителя`
- [x] Есть хотя бы один `кастомный хук`
- [x] Несколько компонентов используют `PropTypes`
- [x] Поиск не должен триггерить много запросов к серверу
- [x] Есть применение `lazy + Suspense`

#### Redux

- [x] Используется `Modern Redux with Redux Toolkit`
- [x] Используются `слайсы`
- [x] Используется `RTK Query`

### 2 уровень (необязательный)

- [x] Используется `TypeScript`
- [x] Реализована `низкая связанность` клиентского кода. <br>
  Для хранения учетных записей пользователей, их Избранного и Истории поиска, могут быть использованы `LocalStorage` 
- [x] Используются `мемоизированные селекторы`

### Дополнительно

- [x] Проект собран при помощи [Vite]
- [x] Для работы с формами использовалась библиотека `react-hook-form`
- [x] При работе со стилями использовались `CSS Modules`

## Что можно добавить в будущем:


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
