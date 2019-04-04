export function checkCache(cacheKey, expiry = 10 * 60) {
  const cached = localStorage.getItem(cacheKey);
  const whenCached = localStorage.getItem(`${cacheKey}:ts`);

  if (cached !== null && whenCached !== null) {
    const age = (Date.now() - whenCached) / 1000;

    if (age < expiry) {
      const response = JSON.parse(cached);

      return response;
    }

    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}:ts`);
  }

  return null;
}

export function cacheResponse(cacheKey, content) {
  localStorage.setItem(cacheKey, JSON.stringify(content));
  localStorage.setItem(`${cacheKey}:ts`, Date.now());
}
