// @ts-check
import { defineConfig } from 'astro/config'
import sentry from '@sentry/astro'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'
import navModel from './src/data/nav-model.json'
import { buildSidebar } from './src/config/nav.mjs'

const codeThemePalette = {
  colors: {
    'editor.background': '#0d0d0d',
    'editor.foreground': '#e8e6e3',
  },
  settings: [
    { settings: { foreground: '#e8e6e3' } },
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: '#6f6b68' },
    },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator',
        'entity.name.type',
        'entity.name.type.class',
        'support.type',
        'support.class',
      ],
      settings: { foreground: '#ff8f7a' },
    },
    {
      scope: [
        'variable',
        'variable.other',
        'meta.definition.variable',
        'entity.name.variable',
        'support.variable',
        'entity.name.function',
        'support.function',
        'variable.function',
        'meta.function-call',
      ],
      settings: { foreground: '#ffc4b8' },
    },
  ],
}

const canshiftCodeThemes = [
  { name: 'canshift-code-dark', type: 'dark', ...codeThemePalette },
  { name: 'canshift-code-light', type: 'light', ...codeThemePalette },
]

export default defineConfig({
  site: 'https://docs.canshift.tmbk.ch',
  integrations: [
    ...(process.env.PUBLIC_SENTRY_DSN
      ? [
          sentry({
            dsn: process.env.PUBLIC_SENTRY_DSN,
            sourceMapsUploadOptions: process.env.SENTRY_AUTH_TOKEN
              ? {
                  org: 'tmbk',
                  project: 'canshift-docs',
                  url: 'https://de.sentry.io',
                  authToken: process.env.SENTRY_AUTH_TOKEN,
                }
              : { enabled: false },
          }),
        ]
      : []),
    react(),
    starlight({
      title: 'CANShift Docs',
      description: 'User and technical documentation for the CANShift dashboard.',
      logo: {
        src: './src/assets/canshift-lockup-outlined-onblack.svg',
        replacesTitle: true,
        alt: 'CANShift',
      },
      favicon: '/favicon.svg',
      expressiveCode: {
        themes: canshiftCodeThemes,
      },
      components: {
        Head: './src/components/Head.astro',
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://docs.canshift.tmbk.ch/og-image-1200x630.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://docs.canshift.tmbk.ch/og-image-1200x630.png',
          },
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/CANShift',
        },
      ],
      sidebar: buildSidebar(navModel),
      customCss: ['./src/styles/canshift.css'],
      lastUpdated: true,
      pagination: true,
    }),
  ],
})
