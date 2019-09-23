module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    'frontend/'
  ],
  collectCoverageFrom: [
    '!**/node_modules/**',
    '!frontend/**',
    '!k8s/**',
    '!docker/**',
    '!coverage/**',
    'app/**/*.js',
  ],
  coverageDirectory: 'coverage'
};
