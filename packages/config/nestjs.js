import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

import globals from 'globals';

import eslint from '@eslint/js';
import eslintTsParser from '@typescript-eslint/parser';

import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslint.configs.recommended,
    allConfig: eslint.configs.all,
});

export default [
    {
        ignores: ['**/.eslintrc.js'],
    },
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
            'prettier'
        )
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(eslintPluginTs),
            'simple-import-sort': eslintPluginSimpleImportSort,
            import: fixupPluginRules(eslintPluginImport),
            'unused-imports': eslintPluginUnusedImports,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            parser: eslintTsParser,
            ecmaVersion: 5,
            sourceType: 'module',

            parserOptions: {
                project: 'tsconfig.json',
            },
        },

        settings: {
            'import/resolver': {
                typescript: {
                    project: 'apps/api/tsconfig.json',
                },

                alias: {
                    map: [['@', './src']],
                },
            },
        },

        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
            '@typescript-eslint/no-misused-promises': 'warn',
        },
    },
];
