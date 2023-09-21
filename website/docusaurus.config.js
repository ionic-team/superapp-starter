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
  plugins: ['@ionic-internal/docusaurus-plugin-tag-manager', 'docusaurus-plugin-sass'],
  themes: ['@ionic-internal/docusaurus-theme'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/ionic-team/superapp-starter/tree/main/website/',
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
        title: 'Ionic Superapp Starter',
        logo: {
          alt: 'Ionic Logo',
          src: 'https://images.prismic.io/ionicframeworkcom/66cfdbef-e59d-463a-8e24-12cb233e9d97_ionic+logo+blue.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Tutorial',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [],
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      tagManager: {
        trackingID: 'GTM-TKMGCBC',
      },
    }),
};

module.exports = config;
