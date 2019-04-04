import 'jest-dom/extend-expect';
import { cacheResponse, checkCache } from '../cache';

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('Core:Cache', () => {
  it('should set localStorage item with given key and content', () => {
    const cacheKey = 'SOME_KEY';
    const content = 'to be cached';

    const now = Date.now();
    Date.now = jest.fn().mockReturnValue(now);

    cacheResponse(cacheKey, content);

    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, cacheKey, JSON.stringify(content));
    expect(localStorage.setItem).toHaveBeenNthCalledWith(2, `${cacheKey}:ts`, now);
  });

  it('should return null when cache entry is not found', () => {
    const cacheKey = 'SOME_KEY';

    expect(checkCache(cacheKey)).toBe(null);
  });

  it('should return cached value if it\'s found inside cache', () => {
    const cacheKey = 'SOME_KEY';
    const content = 'to be cached';

    cacheResponse(cacheKey, content);

    expect(checkCache(cacheKey)).toBe(content);
  });

  it('should not return cached value, even if it\'s found inside cache but expiration date has passed.', () => {
    const cacheKey = 'SOME_KEY';
    const content = 'to be cached';

    const now = Date.now();
    Date.now = jest.fn().mockReturnValue(now);

    cacheResponse(cacheKey, content);

    Date.now = jest.fn().mockReturnValue(now + 15 * 60 * 1000);

    expect(checkCache(cacheKey)).toBe(null);
  });
});
