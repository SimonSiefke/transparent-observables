module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'out.pdf', label: 'pdf' },
          { path: 'index.html', label: 'html' },
        ],
      },
    ],
  ],
}
