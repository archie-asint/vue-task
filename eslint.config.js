import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // JS rules
  js.configs.recommended,

  // ✅ Vue rules WITH PARSER
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // 🔥 THIS FIXES THE ERROR
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs['flat/essential'].rules,

      // CRUD / list rendering
      'vue/require-v-for-key': 'error',
      'vue/no-use-v-if-with-v-for': 'error',

      // props & emits
      'vue/no-mutating-props': 'error',
      'vue/require-explicit-emits': 'warn',

      // v-model & cleanup
      'vue/valid-v-model': 'error',
      'vue/no-unused-vars': 'error',

      // convenience

      "vue/no-unused-components": "error",
      "vue/no-useless-v-bind": "warn",
      "vue/no-useless-template-attributes": "warn",
 
      // Event naming
      "vue/v-on-event-hyphenation": ["error", "always"],
    },
  },
])
