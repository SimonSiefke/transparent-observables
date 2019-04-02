module.exports = {
  verifyConditions: ['@semantic-release/github'],
  prepare: [
    {
      path: '@semantic-release/changelog',
      changelogFile: 'CHANGELOG.md',
    },
    '@semantic-release/git',
  ],
  publish: [
    {
      path: '@semantic-release/github',
      assets: 'out.pdf',
    },
  ],
}
