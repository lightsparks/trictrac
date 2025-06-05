// src/plugins/vuetify.ts

import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
    blueprint: md3,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    primary: '#1976D2',    // Vuetify default blue
                    secondary: '#424242',  // Vuetify default grey
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi', // we installed @mdi/font
    },
});
