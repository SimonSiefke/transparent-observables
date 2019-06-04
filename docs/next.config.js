const images = require('remark-images')
const emoji = require('remark-emoji')
const withPlugins = require('next-compose-plugins')
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    mdPlugins: [images, emoji],
  },
})

const withCSS = require('@zeit/next-css')

module.exports = withPlugins([
  [withMDX, { pageExtensions: ['js', 'jsx', 'md', 'mdx'] }],
  [withCSS],
])

function add() {
  if (x > 2) {
  }
}
