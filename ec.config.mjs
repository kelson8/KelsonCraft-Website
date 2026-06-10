import { defineEcConfig } from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

// https://expressive-code.com/plugins/line-numbers/

// The line numbers code block plugin can be toggled here.

export default defineEcConfig({
    plugins: [pluginLineNumbers()],
    // plugins: [],
})