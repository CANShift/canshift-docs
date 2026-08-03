// @ts-check
import { defineConfig } from 'astro/config'
import sentry from '@sentry/astro'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'

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
      sidebar: [
        {
          label: 'Welcome',
          items: [{ label: 'Overview', link: '/' }],
        },
        {
          label: 'User guide',
          badge: { text: 'Driver', variant: 'success' },
          collapsed: false,
          items: [
            {
              label: 'Get started',
              items: [{ autogenerate: { directory: 'user-guide/getting-started' } }],
            },
            {
              label: 'Install',
              items: [{ autogenerate: { directory: 'user-guide/install' } }],
            },
            {
              label: 'Configure',
              items: [{ autogenerate: { directory: 'user-guide/configure' } }],
            },
            {
              label: 'Use',
              items: [{ autogenerate: { directory: 'user-guide/usage' } }],
            },
          ],
        },
        {
          label: 'Technical docs',
          badge: { text: 'Dev', variant: 'caution' },
          collapsed: false,
          items: [
            {
              label: 'Firmware architecture',
              items: [{ autogenerate: { directory: 'technical/architecture' } }],
            },
            {
              label: 'Reference',
              items: [{ autogenerate: { directory: 'technical/reference' } }],
            },
            {
              label: 'Contributing',
              items: [{ autogenerate: { directory: 'technical/contributing' } }],
            },
          ],
        },
        {
          label: 'External',
          collapsed: true,
          items: [
            {
              label: 'Tuner (web — includes flasher)',
              link: 'https://canshift.tmbk.ch',
              attrs: { target: '_blank', rel: 'noopener' },
              badge: { text: '↗', variant: 'note' },
            },
            {
              label: 'GitHub org',
              link: 'https://github.com/CANShift',
              attrs: { target: '_blank', rel: 'noopener' },
              badge: { text: '↗', variant: 'note' },
            },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      pagination: true,
    }),
  ],
})
