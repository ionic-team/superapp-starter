// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ionic Superapp Starter',
  tagline: 'The jumpstart to your next superapp.',
  url: 'https://ionic.io',
  trailingSlash: false,
  baseUrl: '/docs/superapp-starter/',
  baseUrlIssueBanner: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon-32x32.png',
  organizationName: 'ionic-team',
  projectName: 'superapp-starter',
  presets: [
    [
      '@ionic-docs/preset-classic',
      /** @type {import('@ionic-docs/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: false,
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/ionic-team/superapp-starter/tree/main/website/',
        },
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleTagManager: {
          containerId: 'GTM-TKMGCBC',
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@ionic-docs/preset-classic').ThemeConfig} */
    ({
      logo: {
        alt: 'Ionic Logo',
        src: '/img/logo-light.png',
        srcDark: '/img/logo-dark.png',
        width: 178,
        height: 24,
      },
      // Replace with your project's social card
      navbar: {
        items: [
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Tutorial',
          },
        ],
      },
      sidebar: {
        productDropdown: {
          title: 'Superapp Starter Docs',
          logo: {
            width: 23,
            height: 20,
            alt: 'Superapp Starter Logo',
            src: 'img/components/product-dropdown/logo-light.png',
            srcDark: 'img/components/product-dropdown/logo-dark.png',
          },
          textLinks: [
            {
              url: {
                href: 'https://forum.ionicframework.com',
                target: '_blank',
                rel: 'noopener nofollow',
              },
              label: 'Forum',
            },
          ],
          iconLinks: [
            {
              key: 'github',
              url: {
                href: 'https://github.com/ionic-team/superapp-starter',
                target: '_blank',
                rel: 'noopener nofollow',
              },
            },
          ],
        },
        backButton: {
          url: {
            href: '/docs',
          },
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['swift'],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
