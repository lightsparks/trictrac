// src/types/vuetify-shims.d.ts

// Tell TypeScript “yes, I know. When you see `import 'vuetify/styles'`, treat it as a module.”
declare module 'vuetify/styles';

// Sometimes we also need to allow Vuetify’s own .scss or Sass partials:
declare module 'vuetify/lib/styles/main.sass';
declare module 'vuetify/lib/styles/settings.sass';

// We also imported @mdi/font/css/materialdesignicons.css, so allow that too:
declare module '@mdi/font/css/materialdesignicons.css';

// If you ever import other CSS/SCSS—allow them:
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
