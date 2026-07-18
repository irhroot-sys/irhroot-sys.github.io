module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run preview -- --host 127.0.0.1 --port 4176',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000,
      url: ['http://127.0.0.1:4176/'],
      numberOfRuns: 3,
      settings: { chromeFlags: '--no-sandbox --headless' },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: { target: 'temporary-public-storage' },
  },
};
