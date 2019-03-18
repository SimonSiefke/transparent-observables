const package = require('../../package.json')
const isDev = process.env.NODE_ENV !== 'production'
module.exports = {
  title: 'Transparent Observables',
  description: package.description,
  // base: isDev ? '/' : '/',
  evergreen: true, // only build for modern browsers
  themeConfig: {
    // repo: '',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    activeHeaderLinks: false,
    lastUpdated: 'Last Updated',
    sidebar: ['/', '/development', '/architecture'],
  },
}
