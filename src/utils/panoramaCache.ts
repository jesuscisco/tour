// Simple ImageBitmap cache with LRU eviction and prefetch helpers
// Goal: avoid re-fetching/decoding panoramas and reduce first-load latency

type CacheRecord = {
  promise: Promise<ImageBitmap> | null;
  bmp: ImageBitmap | null;
  lastUsed: number;
};

const MAX_ITEMS = 5; // increased cache size for smoother navigation
const cache = new Map<string, CacheRecord>();

function evictIfNeeded() {
  if (cache.size <= MAX_ITEMS) return;
  // evict least recently used items beyond MAX_ITEMS
  const entries = Array.from(cache.entries()).sort((a, b) => a[1].lastUsed - b[1].lastUsed);
  while (entries.length > MAX_ITEMS) {
    const [key, rec] = entries.shift()!;
    try { rec.bmp?.close?.(); } catch {}
    cache.delete(key);
  }
}

export async function loadPanoramaBitmap(src: string): Promise<ImageBitmap> {
  if (typeof window === 'undefined') throw new Error('Bitmap load only in browser');
  let rec = cache.get(src);
  if (rec?.bmp) {
    // Guard against externally-closed bitmaps (width/height become 0)
    const isClosed = (rec.bmp.width === 0 && rec.bmp.height === 0);
    if (!isClosed) {
      rec.lastUsed = Date.now();
      return rec.bmp;
    }
    // If closed, discard and refetch
    try { rec.bmp.close?.(); } catch {}
    rec.bmp = null;
  }
  if (rec?.promise) {
    const bmp = await rec.promise;
    rec.bmp = bmp;
    rec.lastUsed = Date.now();
    return bmp;
  }
  const promise = (async () => {
    const res = await fetch(src, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${src}: ${res.status}`);
    const blob = await res.blob();
    const bmp = await createImageBitmap(blob);
    return bmp;
  })();
  rec = { promise, bmp: null, lastUsed: Date.now() };
  cache.set(src, rec);
  try {
    const bmp = await promise;
    rec.bmp = bmp;
    rec.promise = null;
    rec.lastUsed = Date.now();
    evictIfNeeded();
    return bmp;
  } catch (e) {
    cache.delete(src);
    throw e;
  }
}

export function prefetchPanoramas(srcs: string[]) {
  if (typeof window === 'undefined') return;
  const unique = Array.from(new Set(srcs)).filter(Boolean);
  // schedule lightly to avoid blocking main thread
  setTimeout(() => {
    unique.forEach(src => {
      if (!cache.has(src)) {
        loadPanoramaBitmap(src).catch(() => {/* ignore */});
      }
    });
  }, 0);
}

export function hasBitmap(src: string) {
  return !!cache.get(src)?.bmp;
}

export function touchBitmap(src: string) {
  const rec = cache.get(src);
  if (rec) rec.lastUsed = Date.now();
}
