Проект ?????
Что выполнено:
Использовался API: ????
1 уровень (обязательный - необходимый минимум)
Реализованы Требования к функциональности
 React
Используются функциональные компоненты c хуками в приоритете над классовыми
Есть разделение на умные и глупые компоненты
Есть рендеринг списков
Реализована хотя бы одна форма
Есть применение Контекст API
Есть применение предохранителя
Есть хотя бы один кастомный хук
Несколько компонентов используют PropTypes
Поиск не должен триггерить много запросов к серверу
Есть применение lazy + Suspense
 Redux
Используется Modern Redux with Redux Toolkit
Используются слайсы
Используется RTK Query
Используется Transforming Responses
2 уровень (необязательный)
Используется TypeScript
Реализована низкая связанность клиентского кода
Для хранения учетных записей пользователей, их Избранного и Истории поиска, могут быть использованы LocalStorage или FireBase. Введена переменная окружения c именем REMOTE_STORE и значениями ls и firebase. В коде приложения есть одно место-переключатель, где в зависимости от значения переменной определяется логика работы: api.ts
Используются мемоизированные селекторы
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
