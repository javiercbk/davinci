// Do not protect these special cases
const excludedUrls = [
  '/api/auth',
  '/api/auth/forgot-password',
  '/api/user',
];
// Also exclude cases using regexp
const excludedUrlsPatterns = [
  '^/api/auth/forgot-password/.*',
].map(pattern => new RegExp(pattern));

const matchOnePatten = (url) => {
  let match = false;
  excludedUrlsPatterns.forEach((regExp) => {
    // test all regexp
    if (url.match(regExp)) {
      match = true;
    }
  });
  return match;
};

module.exports = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }
  if (excludedUrls.indexOf(req.url) !== -1 || matchOnePatten(req.url)) {
    // Allow this url to fail silently
    return next();
  }

  return next(err);
};
