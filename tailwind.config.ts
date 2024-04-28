// tailwind.config.js
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: '#FFFFFF', // or DEFAULT
            foreground: '#11181C', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#6f40d1'
            }
            // ... rest of the colors
          }
        },
        dark: {
          colors: {
            background: '#000000', // or DEFAULT
            foreground: '#ECEDEE', // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: '#FFFFFF',
              DEFAULT: '#6f40d1'
            }
          }
          // ... rest of the colors
        },
        mytheme: {
          // custom theme
          extend: 'dark',
          colors: {
            primary: {
              DEFAULT: '#8a2be2',
              foreground: '#000000'
            },
            focus: '#6f40d1'
          }
        }
      }
    })
  ]
};

export default config;
