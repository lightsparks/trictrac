// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// ① Import the Vuetify plugin
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),

    // ② Call the plugin() function here
    vuetify({
      autoImport: true,
      /*
        autoImport: true ➔ Vite will scan your templates and auto‐import
        only the Vuetify components you actually use.
      */
    }),
  ],
});
