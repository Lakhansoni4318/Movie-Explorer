import { openDB } from "idb";

const DB_NAME = "movie-explorer";
const STORE_NAME = "search-cache";

async function getDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function setCache(key: string, value: any) {
  const db = await getDb();
  const payload = { data: value, timestamp: Date.now() };
  await db.put(STORE_NAME, payload, key);
}

export async function getCache<T>(key: string): Promise<{ data: T; timestamp: number } | null> {
  const db = await getDb();
  return (await db.get(STORE_NAME, key)) || null;
}

export async function deleteCache(key: string) {
  const db = await getDb();
  await db.delete(STORE_NAME, key);
}
